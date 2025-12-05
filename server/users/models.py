from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager
from django.core.validators import RegexValidator

# --- Custom Validators for Regex Match (Phone and Address) ---

# ID_REGEX: 4-24 alphanumeric characters, dashes, or undescores. Must start with a letter/number.
ID_REGEX_VALIDATOR = RegexValidator(
    regex=r'^[A-Za-z0-9][A-Za-z0-9-_]{3,23}$',
    message='La identificación debe tener entre 4 y 24 caracteres alfanuméricos, guiones o guiones bajos, y debe comenzar con una letra o número.'
)

# PHONE_REGEX: Exactly 10 digits, only numbers (0-9).
PHONE_REGEX_VALIDATOR = RegexValidator(
    regex=r'^\d{10}$', # Usamos \d{10} que es equivalente a [0-9]{10}
    message='El número de teléfono debe contener exactamente 10 dígitos numéricos.'
)

# ADDRESS_REGEX: 6-80 characters, allowing letters, numbers, spaces, and punctuation.
ADDRESS_REGEX_VALIDATOR = RegexValidator(
    # Nota: Es crucial usar r'' para raw strings y duplicar las barras si es necesario
    regex=r'^[a-zA-Z0-9\s\-\#\.\,ñÑ]{6,80}$',
    message='La dirección debe tener entre 6 y 80 caracteres y solo puede contener letras, números, espacios y los símbolos: # - . , ñ.'
)


class CustomUser (AbstractUser):
    """
    Custom User model replacing Django's default User.
    It inherits password hashing and authentication methods from AbstractUser.
    
    Fields like 'first_name', 'last_name', and 'email' are inherited, but we 
    redefine 'email' for uniqueness.
    """

    identification = models.CharField(
        max_length=24,
        unique=True,
        validators=[ID_REGEX_VALIDATOR],
        verbose_name="Identificación"
    )

    # Redefine 'email' for uniqueness and blank/null settings
    email = models.EmailField(
        unique=True, 
        verbose_name="Email")

    phone = models.CharField(
        max_length=10,
        validators=[PHONE_REGEX_VALIDATOR], 
        verbose_name="Número Celular")

    address = models.CharField(
        max_length=80,
        validators=[ADDRESS_REGEX_VALIDATOR],
        verbose_name="Dirección de Residencia"
    )

    username = None

    objects = CustomUserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['identification', 'first_name', 'last_name', 'phone', 'address']

    # --- Metadatos ---

    # Date when the user record was created (automatically set on creation).
    created_at = models.DateTimeField(auto_now_add=True)

    # Date of the last update to the user record (automatically updated on save).
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        # Human-readable singular name for the model
        verbose_name = "Usuario"
        # Human-readable plural name for the model
        verbose_name_plural = "Usuarios"
        # Default ordering: Lists users from newest to oldest basen on creation time.
        ordering = ["-created_at"]
        
    def __str__(self):
        """
        Human-readable representation of the object instance.
        Uses the email as the primary identifier in the Django Admin.
        """
        return self.email