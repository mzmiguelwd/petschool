# server/matriculas/serializers.py
from rest_framework import serializers
from .models import Matricula
from .models import Asistencia
from .models import Canino


# Serializador para la creación y gestión de Caninos
class CaninoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Canino
        # Incluye todos los campos excepto el cliente, que lo asignaremos en la vista.
        fields = [
            'id', 
            'nombre', 
            'raza', 
            'edad', 
            'tamano', 
            'observaciones_medicas',
            # 'cliente' NO se incluye aquí, se asigna automáticamente en el ViewSet
        ]
        # Asegúrate de que nadie pueda modificar las fechas de creación.
        read_only_fields = ('fecha_creacion', 'fecha_actualizacion')


# ===================================================================
# 1. SERIALIZADOR PARA LAS ASISTENCIAS (AttendanceChart)
# ===================================================================
class AsistenciaDashboardSerializer(serializers.ModelSerializer):
    # CRÍTICO: Accede al nombre del canino a través de la doble relación: 
    # Asistencia -> Matricula -> Canino -> nombre
    nombre_canino = serializers.CharField(source='matricula.canino.nombre', read_only=True)
    
    class Meta:
        model = Asistencia
        fields = [
            'fecha',
            'presente',
            'nombre_canino'
        ]


# ===================================================================
# 2. SERIALIZADOR PARA LAS MATRÍCULAS/CANINOS (PetsChart)
# ===================================================================
class MatriculaDashboardSerializer(serializers.ModelSerializer):
    # CRÍTICO: Accede al nombre del canino a través de la relación de FK
    # Matricula -> Canino -> nombre
    nombre_canino = serializers.CharField(source='canino.nombre', read_only=True)
    
    # Convierte el valor interno del plan (ej: '1_mes') a su etiqueta visible (ej: '1 mes')
    plan = serializers.CharField(source='get_plan_display', read_only=True)
    
    # Mapea el campo 'estado' del modelo al nombre 'estado_pago' esperado por el frontend
    estado_pago = serializers.CharField(source='estado', read_only=True)

    class Meta:
        model = Matricula
        fields = [
            'nombre_canino', 
            'plan', 
            'fecha_inicio', 
            'fecha_vencimiento', 
            'estado_pago',
        ]


# ===================================================================
# 3. Serializador General (Lo mantienes para otras operaciones CRUD)
# ===================================================================
class MatriculaSerializer(serializers.ModelSerializer):
    # Campos adicionales que se calculan (solo lectura)
    # Nota: get_full_name es un método de AbstractUser que CustomUser hereda.
    cliente_nombre = serializers.CharField(source='cliente.get_full_name', read_only=True) 
    cliente_email = serializers.CharField(source='cliente.email', read_only=True)
    
    # Relación con asistencias (solo lectura) - Si lo necesitas anidado en otras vistas
    # Lo he renombrado para usar el serializer específico del dashboard, si lo deseas anidar
    asistencias = AsistenciaDashboardSerializer(many=True, read_only=True) 
    
    class Meta:
        model = Matricula
        # IMPORTANTE: Ya que Matricula ya no tiene los campos de Canino, '__all__' 
        # es ahora más limpio para operaciones CRUD.
        fields = '__all__'
        read_only_fields = ('cliente', 'fecha_creacion', 'fecha_actualizacion') 
        # Nota: 'fecha_fin' no existe en tu modelo.