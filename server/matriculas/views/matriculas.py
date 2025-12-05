from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from ..models import Matricula
from ..serializers import MatriculaSerializer


class MatriculaViewSet(viewsets.ModelViewSet):
    serializer_class = MatriculaSerializer
    # permission_classes = [permissions.IsAuthenticated]  # Solo usuarios logueados
    permission_classes = [permissions.AllowAny]


    def get_queryset(self):
        """Filtra las matrículas según el tipo de usuario"""
        user = self.request.user
        
        # Si es cliente, solo ve sus propias matrículas
        if user.groups.filter(name='cliente').exists():
            return Matricula.objects.filter(cliente=user)
        
        # Si es admin/director, ve todas
        return Matricula.objects.all()

    def perform_create(self, serializer):
        """Al crear matrícula, automáticamente asigna el cliente logueado"""
        #serializer.save(cliente=self.request.user)
        serializer.save()

    @action(detail=True, methods=['post'])
    def cambiar_estado(self, request, pk=None):
        """Acción personalizada para cambiar estado de matrícula"""
        matricula = self.get_object()
        nuevo_estado = request.data.get('estado')
        
        if nuevo_estado in dict(Matricula.ESTADOS):
            matricula.estado = nuevo_estado
            matricula.save()
            return Response({'status': 'Estado actualizado'})
        return Response({'error': 'Estado inválido'}, status=400)