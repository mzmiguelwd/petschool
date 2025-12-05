from django.contrib import admin
from .models import Matricula

@admin.register(Matricula)
class MatriculaAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'cliente',
        'get_nombre_canino',
        'get_raza',
        'plan',
        'transporte',
        'estado',
        'fecha_inicio',
        'fecha_creacion',
    )
    search_fields = ('canino__nombre', 'canino__raza', 'cliente__username', 'cliente__email')
    
    list_filter = ('plan', 'transporte', 'estado', 'canino__tamano')
    
    # Métodos para acceder a los valores del canino
    def get_nombre_canino(self, obj):
        return obj.canino.nombre
    get_nombre_canino.short_description = 'Nombre del Canino'
    
    def get_raza(self, obj):
        return obj.canino.raza
    get_raza.short_description = 'Raza'