# server/django_project/urls.py
from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('api.v1.urls')),

    # ========== API Documentation (drf-spectacular) ==========

    # 1. OpenAPI Schema: Generates the core OpenAPI specification (YAML/JSON).
    # 2. Swagger UI: Provides a user-friendly, interactive interface for viewing and testing the API schema.
    # 3. Redoc UI: Provides an alternative, documentation-focused interface for the API schema.
    # The 'url_name' parameter points to the schema endpoint defined.
    
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]