from django.contrib import admin
from .models import User

# Register your models here.

# Registers the custom User model with the Django adminsitrative interface.
# This makes the User model manageable (CRUD operations) via the /admin/ route.
admin.site.register(User)
