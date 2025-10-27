from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Matricula(models.Model):
    # Estados posibles de una matrícula
    ESTADOS = [
        ('pendiente', 'Pendiente'),
        ('aprobada', 'Aprobada'),
        ('rechazada', 'Rechazada'),
    ]

    # Planes de matrícula
    PLANES = [
        ('1_mes', '1 mes'),
        ('1_bimestre', '1 bimestre'),
        ('1_trimestre', '1 trimestre'),
        ('6_meses', '6 meses'),
        ('1_anio', '1 año'),
    ]

    # Opciones de transporte
    TRANSPORTE_OPCIONES = [
        ('completo', 'Completo'),
        ('medio', 'Medio (solo mañana o tarde)'),
        ('sin_transporte', 'Sin transporte'),
    ]

    # Tamaños de los caninos
    TAMANOS = [
        ('mini', 'Mini'),
        ('pequeno', 'Pequeño'),
        ('mediano', 'Mediano'),
        ('grande', 'Grande'),
    ]

    # Relación con el usuario cliente
    cliente = models.ForeignKey(User, on_delete=models.CASCADE, related_name='matriculas', null=True, blank=True)

    # Datos del canino
    nombre_canino = models.CharField(max_length=100)
    raza = models.CharField(max_length=100)
    edad = models.IntegerField()
    tamano = models.CharField(max_length=20, choices=TAMANOS, default='mediano')

    # Plan y transporte
    plan = models.CharField(max_length=20, choices=PLANES, default='1_mes')
    transporte = models.CharField(max_length=20, choices=TRANSPORTE_OPCIONES, default='sin_transporte')

    # Observaciones y estado
    observaciones = models.TextField(blank=True)
    estado = models.CharField(max_length=20, choices=ESTADOS, default='pendiente')

    # Fechas
    fecha_inicio = models.DateField()
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.nombre_canino} - {self.plan} ({self.estado})"
