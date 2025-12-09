from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

TAMANOS = [
    ('mini', 'Mini'),
    ('pequeno', 'Pequeño'),
    ('mediano', 'Mediano'),
    ('grande', 'Grande'),
]

class Canino(models.Model):
    cliente = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='caninos',
        verbose_name="Dueño/Cliente"
    )
    
    nombre = models.CharField(max_length=100)
    raza = models.CharField(max_length=100)
    edad = models.PositiveIntegerField(verbose_name="Edad (en años)")
    tamano = models.CharField(max_length=20, choices=TAMANOS, default='mediano')
    
    observaciones_medicas = models.TextField(blank=True, verbose_name="Notas Médicas")
    
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Canino"
        verbose_name_plural = "Caninos"
        ordering = ['nombre']
    
    def __str__(self):
        return self.nombre


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

class Matricula(models.Model):
    # Relación con el usuario cliente
    # La matrícula vincula un canino con un plan para un cliente.
    cliente = models.ForeignKey(User, on_delete=models.CASCADE, related_name='matriculas', null=True, blank=True)
    
    # CRÍTICO: RELACIÓN CON EL CANINO
    canino = models.ForeignKey(
        'Canino', # Referencia al modelo Canino que acabamos de crear
        on_delete=models.CASCADE, 
        related_name='matriculas_activas',
        null=True,
        blank=True
    )

    # Plan y transporte
    plan = models.CharField(max_length=20, choices=PLANES, default='1_mes')
    transporte = models.CharField(max_length=20, choices=TRANSPORTE_OPCIONES, default='sin_transporte')
    
    # Nuevo campo que necesitas en el frontend
    fecha_vencimiento = models.DateField(null=True, blank=True, verbose_name="Fecha de Vencimiento") # <--- ¡AÑADIR ESTE CAMPO!

    # Observaciones y estado
    observaciones = models.TextField(blank=True)
    estado = models.CharField(max_length=20, choices=ESTADOS, default='pendiente')

    # Fechas
    fecha_inicio = models.DateField()
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    
    def is_active(self):
        return self.estado == "aprobada" and (
            not self.fecha_vencimiento or self.fecha_vencimiento >= timezone.now().date()
        )


    def __str__(self):
        return f"{self.canino.nombre} - {self.plan} ({self.estado})"
    

# Provisional mientras se mejora el sistema de asistencia
class Asistencia(models.Model):
    # Es más lógico que la asistencia sea de un canino, no de una matrícula específica.
    # Sin embargo, si quieres mantener el vínculo a Matricula, está bien.
    # Si lo mantienes:
    matricula = models.ForeignKey('Matricula', on_delete=models.CASCADE, related_name='asistencias')
    fecha = models.DateField()
    presente = models.BooleanField(default=True)

    def __str__(self):
        return f"Asistencia de {self.matricula.canino.nombre} el {self.fecha}"
