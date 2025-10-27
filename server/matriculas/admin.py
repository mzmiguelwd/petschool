from django.contrib import admin
from .models import Matricula

@admin.register(Matricula)
class MatriculaAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'cliente',
        'nombre_canino',
        'raza',
        'plan',
        'transporte',
        'estado',
        'fecha_inicio',
        'fecha_creacion',
    )
    search_fields = ('nombre_canino', 'raza', 'cliente__username', 'cliente__email')
    list_filter = ('plan', 'transporte', 'estado', 'tamano')
