from rest_framework import viewsets
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializer import UserRegistrationSerializer
from .models import CustomUser

# Create your views here.

# --- 1. VISTA DE REGISTRO (PÚBLICA) ---
class RegisterView(CreateAPIView):
    """Permite el registro de un nuevo usuario sin requerir autenticación."""
    serializer_class = UserRegistrationSerializer
    queryset = CustomUser.objects.all()
    permission_classes = [AllowAny] # CUALQUIERA puede POSTear aquí (registrarse)


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
class MyProfileView(RetrieveAPIView):
    """Permite a un usuario autenticado ver solo su propio perfil."""
    serializer_class = UserRegistrationSerializer # O un serializer de lectura
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Asegura que el usuario solo puede acceder a sus propios datos
        return self.request.user

# vista pública
class PublicUserListViewSet(viewsets.ModelViewSet):
    serializer_class = UserRegistrationSerializer # Puedes usar este o uno más simple para la gestión
    queryset = CustomUser.objects.all()
    permission_classes = [AllowAny]