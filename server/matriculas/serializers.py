# server/matriculas/serializers.py
from rest_framework import serializers
from .models import Matricula

class MatriculaSerializer(serializers.ModelSerializer):
    # Campos adicionales que se calculan (solo lectura)
    cliente_nombre = serializers.CharField(source='cliente.get_full_name', read_only=True)
    cliente_email = serializers.CharField(source='cliente.email', read_only=True)
    
    class Meta:
        model = Matricula
        fields = '__all__'  # Incluye todos los campos del modelo
        read_only_fields = ('cliente', 'fecha_creacion', 'fecha_actualizacion')