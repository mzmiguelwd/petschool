"""
ASGI config for django_project project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/asgi/
"""


import os
from django.core.asgi import get_asgi_application


# Sets the default environment variable for Django's settings module.
# This tells Django where to find the configuration settings (settings.py)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_project.settings')

# The primary entry point for ASGI-compatible web servers (e.g., Daphne, Hypercorn).
# This variable holds the ASGI application instance.
application = get_asgi_application()
