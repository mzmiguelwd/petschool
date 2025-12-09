from django.db import transaction
from rest_framework import viewsets, permissions
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import date
from ..models import Matricula, Asistencia
from ..serializers import MatriculaSerializer
from ..serializers import AsistenciaBulkSerializer


class DirectorAsistenciaView(APIView):
    permissions_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        """
        Devuelve todas las matriculas activas y su estado de asistencia para una fecha dada.
        Query Param: ?date=YYYY-MM-DD (Default: Hoy)
        """
        query_date_str = request.query_params.get('date', str(date.today()))
        
        # 1. Obtener Matrículas Activas (Aprobadas y no vencidas)
        # Ajusta el filtro según tu lógica de negocio exacta
        matriculas = Matricula.objects.filter(
            estado='aprobada',
            fecha_vencimiento__gte=query_date_str
        ).select_related('canino', 'cliente').order_by('canino__nombre')
        
        # 2. Obtener Asistencias ya registradas para esa fecha
        asistencias_existentes = Asistencia.objects.filter(
            fecha=query_date_str,
            matricula__in=matriculas
        ).values('matricula_id', 'presente', 'id')
        
        # Convertir a diccionario para acceso rápido: { matricula_id: { presente: bool, id: int } }
        asistencias_map = {a['matricula_id']: a for a in asistencias_existentes}
        
        # 3. Construir respuesta fusionada
        data = []
        for m in matriculas:
            estado_asistencia = asistencias_map.get(m.id)
            data.append({
                'matricula_id': m.id,
                'nombre_canino': m.canino.nombre,
                'raza': m.canino.raza,
                'dueño': f"{m.cliente.first_name} {m.cliente.last_name}",
                # Si existe registro, usar su valor. Si no, por defecto asume Presente (True) o null (sin tomar)
                'presente': estado_asistencia['presente'] if estado_asistencia else False,
                'registrado': estado_asistencia is not None # Para saber si ya se tomó lista o es nuevo
            })
            
            return Response({'fecha': query_date_str, 'alumnos': data})
        
    def post(self, request):
        """
        Guarda o actualiza la asistencia masivamente.
        """
        serializer = AsistenciaBulkSerializer(data=request.data, many=True)
        if serializer.is_valid():
            validated_data = serializer.validated_data
            
            # Usamos atomic para asegurar que se guarden todos o ninguno
            with transaction.atomic():
                for item in validated_data:
                    Asistencia.objects.update_or_create(
                        matricula_id=item['matricula_id'],
                        fecha=item['fecha'],
                        defaults={'presente': item['presente']}
                    )
            
            return Response({'status': 'Asistencia guardada correctamente'}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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