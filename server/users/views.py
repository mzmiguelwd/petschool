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
from .utils import check_recaptcha

class RecaptchaTokenObtainPairView(TokenObtainPairView):
    """
    Extiende la vista estándar de JWT para requerir la validación de reCAPTCHA v2
    antes de emitir los tokens de acceso y refresco.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        # 1. Obtener el token de reCAPTCHA desde el cuerpo de la solicitud (React)
        recaptcha_token = request.data.get('g-recaptcha-response')
        
        if not recaptcha_token:
            return Response(
                {"detail": "El token de reCAPTCHA es obligatorio."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # 2. VALIDAR EL RECAPTCHA
        is_valid_recaptcha = check_recaptcha(recaptcha_token)

        if not is_valid_recaptcha:
            # 3. Denegar si la verificación de reCAPTCHA falla
            return Response(
                {"detail": "Fallo en la verificación de seguridad reCAPTCHA."},
                status=status.HTTP_403_FORBIDDEN
            )

        # 4. Si el reCAPTCHA es válido, procedemos con el LOGIN estándar de JWT
        # Esto llama al serializador subyacente que verifica credenciales (usuario/password)
        response = super().post(request, *args, **kwargs)

        # Si el login JWT fue exitoso, y quieres usar cookies (como en tu CookieTokenRefreshView):
        if response.status_code == status.HTTP_200_OK:
            # Si estás implementando un sistema de cookies, extrae el token de refresco 
            # y configúralo en la cookie, luego elimínalo del cuerpo de la respuesta JSON.
            
            refresh_token = response.data.get("refresh")
            if refresh_token:
                response.set_cookie(
                    key="refresh_token",
                    value=refresh_token,
                    httponly=True,
                    secure=False,  # Usar True en producción con HTTPS
                    samesite="Lax",
                    max_age=86400 * 7, # 7 días, por ejemplo
                    path="/api/v1/users/auth/" # Ajusta la ruta base de tus rutas JWT
                )
                del response.data['refresh'] # Quitarlo de la respuesta JSON
        
        return response

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
    serializer_class = UserProfileSerializer
    queryset = CustomUser.objects.all()
    permission_classes = [AllowAny]

    # permitir actualizaciones parciales
    def update(self, request, *args, **kwargs):
        kwargs["partial"] = True
        return super().update(request, *args, **kwargs)


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