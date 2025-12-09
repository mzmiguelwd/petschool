from rest_framework import serializers
from .models import Matricula, Asistencia, Canino

# ============================================================
# 1. SERIALIZADORES DE UTILIDAD (No atados a un modelo específico)
# ============================================================

class AsistenciaBulkSerializer(serializers.Serializer):
    """
    Serializer para validar el array de objetos que llega desde
    AttendanceDirectorPage para guardar la asistencia masiva.
    """
    matricula_id = serializers.IntegerField()
    fecha = serializers.DateField()
    presente = serializers.BooleanField()
    
    
# ============================================================
# 2. ASISTENCIAS (Dashboard / Lectura)
# ============================================================

class AsistenciaDashboardSerializer(serializers.ModelSerializer):
    nombre_canino = serializers.CharField(
        source='matricula.canino.nombre', read_only=True
    )

    class Meta:
        model = Asistencia
        fields = ['fecha', 'presente', 'nombre_canino']


# ============================================================
# 3. MATRÍCULAS - Dashboard
# ============================================================
class MatriculaDashboardSerializer(serializers.ModelSerializer):
    nombre_canino = serializers.CharField(source='canino.nombre', read_only=True)
    plan = serializers.CharField(source='get_plan_display', read_only=True)
    transporte = serializers.CharField(source='get_transporte_display', read_only=True)
    estado_pago = serializers.CharField(source='estado', read_only=True)

    class Meta:
        model = Matricula
        fields = [
            'id',
            'nombre_canino',
            'plan',
            'transporte',
            'fecha_inicio',
            'fecha_vencimiento',
            'estado_pago',
        ]


# ============================================================
# 4. MATRÍCULAS - CRUD
# ============================================================
class MatriculaSerializer(serializers.ModelSerializer):
    cliente_nombre = serializers.CharField(source='cliente.get_full_name', read_only=True)
    cliente_email = serializers.CharField(source='cliente.email', read_only=True)

    # Información del canino (mínima para frontend)
    canino_nombre = serializers.CharField(source='canino.nombre', read_only=True)

    asistencias = AsistenciaDashboardSerializer(many=True, read_only=True)

    class Meta:
        model = Matricula
        fields = [
            'id',
            'cliente',
            'cliente_nombre',
            'cliente_email',

            'canino',
            'canino_nombre',

            'plan',
            'transporte',

            'fecha_inicio',
            'fecha_vencimiento',

            'observaciones',
            'estado',

            'asistencias',

            'fecha_creacion',
            'fecha_actualizacion',
        ]

        read_only_fields = (
            'cliente',
            'fecha_vencimiento',
            'estado',
            'fecha_creacion',
            'fecha_actualizacion',
        )

# ============================================================
# 1. CANINOS
# ============================================================
class CaninoSerializer(serializers.ModelSerializer):
    matricula = serializers.SerializerMethodField()

    class Meta:
        model = Canino
        fields = [
            'id',
            'nombre',
            'raza',
            'edad',
            'tamano',
            'observaciones_medicas',
            'matricula',
        ]

    def get_matricula(self, obj):
        """
        Retorna la matrícula activa o la más reciente si no hay activa.
        Esto permite al frontend saber si el canino está matriculado.
        """
        # Matrícula activa
        activa = obj.matriculas_activas.filter(estado='aprobada').order_by('-fecha_inicio').first()
        if activa:
            return MatriculaDashboardSerializer(activa).data

        # Matrícula más reciente (si quieres permitir pendientes)
        reciente = obj.matriculas_activas.order_by('-fecha_inicio').first()
        return MatriculaDashboardSerializer(reciente).data if reciente else None
