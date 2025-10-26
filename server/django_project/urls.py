"""
URL configuration for django_project project.

The `urlpatterns` list routes URLs to views.
For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""


from django.contrib import admin
from django.urls import path, include
# Imports for API documentation tools provided by drf-spectacular
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView


urlpatterns = [
  
    path('api/', include('matriculas.urls')),
    # Admin Interface Route: Provides access to Django's built-in administration panel.
    path('admin/', admin.site.urls),

    # App-Specific Routes: Directs traffic starting with 'users/' to the 'users' application's URL configuration.
    path('users/', include('users.urls')),

    # --- API Documentation (drf-spectacular) ---

    # 1. OpenAPI Schema Endpoint: Generates the core OpenAPI specification (YAML/JSON).
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),

    # 2. Swagger UI: Provides a user-friendly, interactive interface for viewing and testing the API schema.
    # The 'url_name' parameter points to the schema endpoint defined above.
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),

    # 3. Redoc UI: Provides an alternative, documentation-focused interface for the API schema.
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]
