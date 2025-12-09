from rest_framework import serializers
from matriculas.models import Matricula, Asistencia
from datetime import timedelta, datetime, date
from django.utils import timezone
import random


#Matrículas agrupadas por raza o tamaño
class MatriculaGroupSerializer(serializers.Serializer):
    label = serializers.CharField()   # 'raza' o 'tamano'
    total = serializers.IntegerField()


#Porcentaje de ocupación por plan
class PlanOccupancySerializer(serializers.Serializer):
    plan = serializers.CharField()
    porcentaje = serializers.FloatField()


#Top 5 caninos con mayor asistencia
class TopAsistenciaSerializer(serializers.Serializer):
    # esperamos recibir dicts con la clave 'nombre_canino' (alias aplicado en la consulta)
    nombre_canino = serializers.CharField()
    total_asistencias = serializers.IntegerField()


#Serializer principal del Dashboard
class DashboardDirectorSerializer(serializers.Serializer):
    matriculas_por_raza = MatriculaGroupSerializer(many=True)
    matriculas_por_tamano = MatriculaGroupSerializer(many=True)
    ocupacion_por_plan = PlanOccupancySerializer(many=True)
    top_5_asistencia = TopAsistenciaSerializer(many=True)

class CaninoMatriculadoSerializer(serializers.ModelSerializer):
    # devolver nombre soportando modelo o dict
    nombre_canino = serializers.SerializerMethodField()
    fecha_vencimiento = serializers.SerializerMethodField()
    pago_estado = serializers.SerializerMethodField()

    class Meta:
        model = Matricula
        fields = [
            'nombre_canino',
            'plan',
            'fecha_inicio',
            'fecha_vencimiento',
            'pago_estado',
        ]

    def get_nombre_canino(self, obj):
        # Si viene un dict (ej: .values() o datos aliasados)
        if isinstance(obj, dict):
            return (
                obj.get("nombre_canino")
                or obj.get("canino__nombre")
                or obj.get("matricula__canino__nombre")
                or (obj.get("canino") and (obj["canino"].get("nombre") if isinstance(obj["canino"], dict) else None))
                or "—"
            )

        # Si es instancia de modelo Matricula
        canino = getattr(obj, "canino", None)
        return getattr(canino, "nombre", "—")

    def get_fecha_vencimiento(self, obj):
        # Cálculo provisional basado en el plan (misma lógica previa, soporta dict/model)
        duraciones = {
            '1_mes': 30,
            '1_bimestre': 60,
            '1_trimestre': 90,
            '6_meses': 180,
            '1_anio': 365,
        }

        if isinstance(obj, dict):
            plan_key = obj.get('plan') or '1_mes'
            raw_fecha = obj.get('fecha_inicio')
        else:
            plan_key = getattr(obj, 'plan', None) or '1_mes'
            raw_fecha = getattr(obj, 'fecha_inicio', None)

        # Normalizar fecha_inicio
        if not raw_fecha:
            fecha_inicio = timezone.now().date()
        elif isinstance(raw_fecha, datetime):
            fecha_inicio = raw_fecha.date()
        elif isinstance(raw_fecha, date):
            fecha_inicio = raw_fecha
        else:
            try:
                fecha_inicio = datetime.fromisoformat(str(raw_fecha)).date()
            except Exception:
                try:
                    fecha_inicio = datetime.strptime(str(raw_fecha), "%Y-%m-%d").date()
                except Exception:
                    fecha_inicio = timezone.now().date()

        dias = duraciones.get(plan_key, 30)
        return (fecha_inicio + timedelta(days=dias)).strftime("%Y-%m-%d")

    def get_pago_estado(self, obj):
        # Provisional: aleatorio entre pagado y pendiente
        return random.choice(["Pagado", "Pendiente"])


class AsistenciaCaninoSerializer(serializers.Serializer):
    nombre_canino = serializers.CharField()
    total_asistencias = serializers.IntegerField()


class DashboardClienteSerializer(serializers.Serializer):
    # usar serializers concretos en lugar de ListField para que coincida con la estructura
    caninos_matriculados = CaninoMatriculadoSerializer(many=True)
    asistencias = AsistenciaCaninoSerializer(many=True)
