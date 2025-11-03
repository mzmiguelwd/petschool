from django.urls import path, include
from rest_framework import routers
from users import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


# Initialize the DefaultRouter provided by Django REST Framework.
# The router automatically generates URL patterns for standard CRUD operations (list, retrieve, create, update, destroy).
router = routers.DefaultRouter()


# 1. Registra el ViewSet de Gestión (CRUD PROTEGIDO)
# La ruta base será: /api/v1/users/management/
router.register(r'management', views.UserViewSet, basename='user-management')


# Define the final URL patterns.
urlpatterns = [
    # 2. LOGIN JWT (Público)
    # Ruta: /api/v1/auth/
    path("auth/", TokenObtainPairView.as_view(), name="token_obtain_pair"),

    # 3. REFRESH TOKEN JWT (Público)
    # Ruta: /api/v1/auth/refresh/
    path("auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    # 4. REGISTRO DE USUARIO (Público)
    # Ruta: /api/v1/register/
    path(
        "register/",
        views.RegisterView.as_view(), # Usa la vista basada en GenericAPIView (RegisterView)
        name="user-register"
    ),

    # 5. INCLUIR LAS RUTAS DEL ROUTER (CRUD PROTEGIDO)
    # Esto genera /api/v1/users/management/, /api/v1/users/management/<id>, etc.
    path("", include(router.urls)),

    # 6. Perfil del usuario logueado
    path("me/", views.MyProfileView.as_view(), name="user-profile"),
]
