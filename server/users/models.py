from django.db import models

# Create your models here.

class User (models.Model):
    """
    Basic custom User model.
    Represents an application user with contact and meta data.
    Note: This model does not replace Django's AbstractUser for authentication.
    but serves as a profile/contact model for the application context.
    """

    # User's first name. Max length 50 is typical.
    name = models.CharField(max_length=50, verbose_name="First Name")

    # User's last name.
    last_name = models.CharField(max_length=50, verbose_name="Last Name")

    # Email: Must be unique for each user and includes automatic format validation.
    email = models.EmailField(unique=True, verbose_name="Email Address")

    # Phone number: Allows blank and nulls in the database (optional field).
    phone = models.CharField(max_length=20, blank=True, null=True, verbose_name="Phone Number")

    # Date when the user record was created (automatically set on creation).
    created_at = models.DateTimeField(auto_now_add=True)

    # Date of the last update to the user record (automatically updated on save).
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        # Human-readable singular name for the model
        verbose_name = "User"
        # Human-readable plural name for the model
        verbose_name_plural = "Users"
        # Default ordering: Lists users from newest to oldest basen on creation time.
        ordering = ["-created_at"]

def __str__(self):
    """
    Human-readable representation of the object instance.
    Uses the email as the primary identifier in the Django Admin.
    """
    return self.email