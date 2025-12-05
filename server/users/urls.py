# server/users/urls.py
from django.urls import path, include
from rest_framework import routers
from users import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import CookieTokenRefreshView


router = routers.DefaultRouter()

# CRUD protegido (solo admin/management)
router.register(r'management', views.UserViewSet, basename='users-management')

# Rutas públicas (listado público de usuarios)
router.register(r'public', views.PublicUserListViewSet, basename='users-public')


urlpatterns = [
    # Autenticación JWT
    path("auth/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("auth/refresh/", CookieTokenRefreshView.as_view(), name="token_refresh"),

    # Registro público
    path("register/", views.RegisterView.as_view(), name="user-register"),
    
    # Perfil del usuario logueado
    path("me/", views.ProfileView.as_view(), name="user-profile"),

    # Rutas del router (management, public-list, etc.)
    path("", include(router.urls)),
]