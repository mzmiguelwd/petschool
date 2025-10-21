from django.apps import AppConfig


class UsersConfig(AppConfig):
    """
    Configuration class for the 'users' application.
    Used by Django to manage the application's metadata and settings.
    """

    # Specifies the default primary key type for models within this app.
    # Set to BigAutoField (64-bit integer) for future scalability.
    default_auto_field = 'django.db.models.BigAutoField'

    # The short, unique name for the application.
    name = 'users'

    # Provides a human-readable name for the application, primarily used in the Admin site.
    verbose_name = 'User Management and Authentication'
