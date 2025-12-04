from rest_framework import serializers
from matriculas.models import Matricula, Asistencia
from datetime import timedelta, datetime
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
    nombre_canino = serializers.CharField(source='matricula__nombre_canino')
    total_asistencias = serializers.IntegerField()


#Serializer principal del Dashboard
class DashboardDirectorSerializer(serializers.Serializer):
    matriculas_por_raza = MatriculaGroupSerializer(many=True)
    matriculas_por_tamano = MatriculaGroupSerializer(many=True)
    ocupacion_por_plan = PlanOccupancySerializer(many=True)
    top_5_asistencia = TopAsistenciaSerializer(many=True)

class CaninoMatriculadoSerializer(serializers.ModelSerializer):
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

    def get_fecha_vencimiento(self, obj):
        # Cálculo provisional basado en el plan
        duraciones = {
            '1_mes': 30,
            '1_bimestre': 60,
            '1_trimestre': 90,
            '6_meses': 180,
            '1_anio': 365,
        }
        fecha_inicio = timezone.now().date() #TODO: obj.fecha_inicio
        # usar clave por defecto si obj.plan es None/''/False
        plan_key = getattr(obj, 'plan', None) or '1_mes'

        dias = duraciones.get(plan_key, 30)
        return (fecha_inicio + timedelta(days=dias)).strftime("%Y-%m-%d")

    def get_pago_estado(self, obj):
        # Provisional: aleatorio entre pagado y pendiente
        return random.choice(["Pagado", "Pendiente"])


class AsistenciaCaninoSerializer(serializers.Serializer):
    nombre_canino = serializers.CharField()
    total_asistencias = serializers.IntegerField()


class DashboardClienteSerializer(serializers.Serializer):
    caninos_matriculados = CaninoMatriculadoSerializer(many=True)
    asistencias = AsistenciaCaninoSerializer(many=True)
