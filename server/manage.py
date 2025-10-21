#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""

    # Sets the DJANGO_SETTINGS_MODULE environment variable.
    # This is critical as it tells Django where to find the project's settings configuration.
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_project.settings')

    try:
        # Attempts to import the Django management utility.
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        # Handles the ImportError if Django is not found in the environment.
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc

    # Executes the command passed via the command line (e.g., 'python manage.py runserver').
    # sys.argv contains the list of command-line arguments.
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    # Standard Python entry point: executes the main() function when the script is run directly.
    main()
