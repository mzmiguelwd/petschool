from django.contrib import admin

# Register your models here.

# Registers the custom User model with the Django adminsitrative interface.
# This makes the User model manageable (CRUD operations) via the /admin/ route.

from django.contrib import admin
from .models import CustomUser

@admin.register(CustomUser)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'role',
        'identification',
        'email',
        'phone',
        'address',
        'first_name',
        'last_name',
        'created_at',
        'updated_at',
    )
    
    # search_fields = ('canino__nombre', 'canino__raza', 'cliente__username', 'cliente__email')
    
    # list_filter = ('plan', 'transporte', 'estado', 'canino__tamano')
    
    # # Métodos para acceder a los valores del canino
    # def get_nombre_canino(self, obj):
    #     return obj.canino.nombre
    # get_nombre_canino.short_description = 'Nombre del Canino'
    
    # def get_raza(self, obj):
    #     return obj.canino.raza
    # get_raza.short_description = 'Raza'