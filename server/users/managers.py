from django.contrib.auth.models import BaseUserManager

class CustomUserManager(BaseUserManager):
    """
    Manager personalizado para el CustomUser, usa email como USERNAME_FIELD
    y no requiere el argumento posicional 'username' en create_user.
    """
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("El email debe ser configurado")
        
        email = self.normalize_email(email)

        # 1. Crear la instancia del usuario
        user = self.model(email=email, **extra_fields)

        # 2. Hashear la contraseña (si existe)
        user.set_password(password)

        # 3. Guardar en la base de datos
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password=None, **extra_fields):
        # Asegura que los campos de superusuario estén en True
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
            
        # El Superusuario también debe ser creado con email y password
        return self.create_user(email, password, **extra_fields)