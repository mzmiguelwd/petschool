from django.db import models
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

# Create your models here.

class User (models.Model):
    """
    Basic custom User model.
    Represents an application user with contact and meta data.
    Note: This model does not replace Django's AbstractUser for authentication.
    but serves as a profile/contact model for the application context.
    """

    identification = models.CharField(
        max_length=24,
        unique=True,
        validators=[ID_REGEX_VALIDATOR],
        verbose_name="Identificación"
    )

    name = models.CharField(
        max_length=50, 
        verbose_name="Nombre(s)")

    last_name = models.CharField(
        max_length=50, 
        verbose_name="Apellido(s)")

    email = models.EmailField(
        unique=True, 
        verbose_name="Email")

    phone = models.CharField(
        max_length=10, 
        blank=True, 
        null=True, 
        validators=[PHONE_REGEX_VALIDATOR], 
        verbose_name="Número Celular")

    address = models.CharField(
        max_length=80,
        validators=[ADDRESS_REGEX_VALIDATOR],
        verbose_name="Dirección de Residencia"
    )

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