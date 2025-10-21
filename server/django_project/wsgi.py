"""
WSGI config for django_project project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""


import os
from django.core.wsgi import get_wsgi_application


# Set the default environment variable for Django's settings module.
# This ensures that Django knows which settings file to use when tunning the application.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_project.settings')

# The main WSGI application object. This is what production WSGI servers (like Gunicord or uWSGI) use
# to communicate with the Django application.
application = get_wsgi_application()
