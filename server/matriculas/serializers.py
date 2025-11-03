# server/matriculas/serializers.py
from rest_framework import serializers
from .models import Matricula
from .models import Asistencia

# Serializer de Asistencias
class AsistenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asistencia
        fields = ['id', 'fecha', 'presente']

class MatriculaSerializer(serializers.ModelSerializer):
    # Campos adicionales que se calculan (solo lectura)
    cliente_nombre = serializers.CharField(source='cliente.get_full_name', read_only=True)
    cliente_email = serializers.CharField(source='cliente.email', read_only=True)
    
    # Relación con asistencias (solo lectura)
    asistencias = AsistenciaSerializer(many=True, read_only=True)
    
    class Meta:
        model = Matricula
        fields = '__all__'  # Incluye todos los campos del modelo
        read_only_fields = ('cliente', 'fecha_creacion', 'fecha_actualizacion', 'fecha_fin')