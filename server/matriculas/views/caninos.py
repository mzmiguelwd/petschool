from rest_framework import viewsets, permissions
from ..models import Canino
from ..serializers import CaninoSerializer


class CaninoViewSet(viewsets.ModelViewSet):
    serializer_class = CaninoSerializer
    # CRÍTICO: Debe estar protegido. Solo el dueño puede agregar/ver sus caninos.
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Garantiza que el usuario solo pueda ver sus propios caninos.
        """
        # Filtra los caninos por el usuario autenticado (cliente).
        return Canino.objects.filter(cliente=self.request.user).order_by('nombre')

    def perform_create(self, serializer):
        """
        Asigna automáticamente el usuario (cliente) autenticado al canino que se está creando.
        """
        # Asigna el campo 'cliente' al usuario que realiza la solicitud.
        serializer.save(cliente=self.request.user)

    # Nota: Los métodos `perform_update` y `perform_destroy` usarán
    # automáticamente el `get_queryset` filtrado, asegurando que un usuario
    # no pueda modificar/eliminar caninos de otros.