# users/views.py
from rest_framework import viewsets
from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import CustomUser
from .serializer import UserRegistrationSerializer, UserProfileSerializer

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import permissions, status
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


class RegisterView(CreateAPIView):
    """Permite el registro de un nuevo usuario sin requerir autenticación."""
    serializer_class = UserRegistrationSerializer
    queryset = CustomUser.objects.all()
    permission_classes = [AllowAny]


# --- 2. VISTA DE GESTIÓN DE USUARIOS (PROTEGIDA) ---
class UserViewSet(viewsets.ModelViewSet):
    """
    Proporciona operaciones CRUD para la gestión de usuarios.
    Requiere que el usuario esté autenticado con un token JWT.
    Idealmente, se usaría un permiso personalizado (ej: IsAdminUser) para el borrado/listado.
    """

    serializer_class = UserRegistrationSerializer # Puedes usar este o uno más simple para la gestión
    queryset = CustomUser.objects.all()
    permission_classes = [IsAuthenticated]

# --- 3. VISTA DE PERFIL (SOLO LECTURA PERSONAL) ---
class ProfileView(RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Devuelve el usuario autenticado — usado tanto por GET como por PUT/PATCH
        return self.request.user

# vista pública
class PublicUserListViewSet(viewsets.ModelViewSet):
    serializer_class = UserRegistrationSerializer # Puedes usar este o uno más simple para la gestión
    queryset = CustomUser.objects.all()
    permission_classes = [AllowAny]


class CookieTokenRefreshView(TokenRefreshView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh_token')

        if not refresh_token:
            return Response({"detail": "Refresh token no encontrado"}, status=401)

        try:
            token = RefreshToken(refresh_token)
            access_token = str(token.access_token)

            # Si usas ROTATE_REFRESH_TOKENS=True
            new_refresh = str(token)

            response = Response({"access": access_token})

            response.set_cookie(
                "refresh_token",
                new_refresh,
                httponly=True,
                secure=False,  # True en producción
                samesite="Lax",
                max_age=86400,
                path="/api/v1/users/auth/refresh/"
            )

            return response

        except Exception:
            return Response({"detail": "Refresh inválido"}, status=401)