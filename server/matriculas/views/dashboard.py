from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from ..models import Matricula, Asistencia
from ..serializers import MatriculaDashboardSerializer, AsistenciaDashboardSerializer


class DashboardClienteAPIView(APIView):
    # CRÍTICO: Esta vista DEBE estar protegida
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # El usuario se obtiene automáticamente del token Bearer
        cliente_autenticado = request.user 
        
        # 1. Obtener Matrículas (Datos para PetsChart)
        matriculas_queryset = (
            Matricula.objects
            .filter(cliente=cliente_autenticado)
            .select_related('canino') # Pre-carga la información del Canino
            .order_by('-fecha_creacion')
        )
        
        matriculas_data = MatriculaDashboardSerializer(matriculas_queryset, many=True).data

        # 2. Obtener Asistencias (Datos para AttendanceChart)
        matricula_ids = matriculas_queryset.values_list('id', flat=True)
        
        asistencias_queryset = (
            Asistencia.objects
            .filter(matricula__id__in=matricula_ids)
            # Pre-carga Matricula Y Canino para que el serializador funcione eficientemente
            .select_related('matricula__canino') 
            .order_by('-fecha')[:10]
        )
        
        asistencias_data = AsistenciaDashboardSerializer(asistencias_queryset, many=True).data

        # 3. Construir la respuesta final
        dashboard_data = {
            "caninos_matriculados": matriculas_data, 
            "asistencias": asistencias_data,
        }

        return Response(dashboard_data)