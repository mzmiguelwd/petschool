# server/matriculas/models.py
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()  # Obtiene el modelo de usuario

class Matricula(models.Model):
    # Estados posibles de una matrícula
    ESTADOS = [
        ('pendiente', 'Pendiente'),
        ('aprobada', 'Aprobada'),
        ('rechazada', 'Rechazada'),
    ]
    
    # Servicios que ofrece PETSCHOOL
    SERVICIOS = [
        ('obediencia_basica', 'Obediencia Básica'),
        ('agilidad_canina', 'Agilidad Canina'),
        ('socializacion', 'Socialización'),
    ]

    # Relación: cada matrícula pertenece a un cliente
    cliente = models.ForeignKey(User, on_delete=models.CASCADE, related_name='matriculas', null=True, blank=True)

    
    # Datos del perro
    nombre_perro = models.CharField(max_length=100)
    raza = models.CharField(max_length=100)
    edad = models.IntegerField()
    
    # Servicio solicitado
    servicio = models.CharField(max_length=50, choices=SERVICIOS)
    
    # Fecha deseada para empezar
    fecha_inicio = models.DateField()
    
    # Observaciones adicionales
    observaciones = models.TextField(blank=True)
    
    # Estado actual de la matrícula
    estado = models.CharField(max_length=20, choices=ESTADOS, default='pendiente')
    
    # Fechas automáticas
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.nombre_perro} - {self.servicio} ({self.estado})"