from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, viewsets
from matriculas.models import Matricula, Asistencia, User
from django.db.models import Count
from django.db.models import Count, F
from .serializer import (
    DashboardDirectorSerializer,
    DashboardClienteSerializer,
    CaninoMatriculadoSerializer,
)
import csv
from django.http import HttpResponse

class DashboardDirectorView(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]  # luego cambiar a IsAuthenticated

    def list(self, request):
        #Cantidad de matrículas por raza
        matriculas_por_raza = list(
            Matricula.objects.values(label=F('raza'))
            .annotate(total=Count('id'))
            .order_by('-total')
        )

        #Cantidad de matrículas por tamaño
        matriculas_por_tamano = list(
            Matricula.objects.values(label=F('tamano'))
            .annotate(total=Count('id'))
            .order_by('-total')
        )

        #Porcentaje de ocupación por plan
        total_matriculas = Matricula.objects.count()
        ocupacion_por_plan = []
        if total_matriculas > 0:
            ocupacion_por_plan = [
                {
                    'plan': item['plan'],
                    'porcentaje': round((item['total'] / total_matriculas) * 100, 2),
                }
                for item in Matricula.objects.values('plan').annotate(total=Count('id'))
            ]

        #Top 5 caninos con mayor asistencia
        top_5_asistencia = list(
            Asistencia.objects.values('matricula__nombre_canino')
            .annotate(total_asistencias=Count('id'))
            .order_by('-total_asistencias')[:5]
        )

        #Combinar todos los datos
        data = {
            'matriculas_por_raza': matriculas_por_raza,
            'matriculas_por_tamano': matriculas_por_tamano,
            'ocupacion_por_plan': ocupacion_por_plan,
            'top_5_asistencia': top_5_asistencia,
        }

        serializer = DashboardDirectorSerializer(data)
        return Response(serializer.data)

class ReporteCSVView(APIView):
    permission_classes = [permissions.AllowAny]  # Cambiar a IsAuthenticated luego

    def get(self, request, tipo):
        """
        Genera reportes descargables en CSV:
        - /api/dashboard/reporte/matriculas/
        - /api/dashboard/reporte/asistencias/
        """
        if tipo == 'matriculas':
            queryset = Matricula.objects.all()
            filename = 'reporte_matriculas.csv'
            headers = ['Cliente', 'Canino', 'Raza', 'Tamaño', 'Plan', 'Estado', 'Fecha inicio']
            rows = [
                [
                    m.cliente.username if m.cliente else '---',
                    m.nombre_canino,
                    m.raza,
                    m.tamano,
                    m.plan,
                    m.estado,
                    m.fecha_inicio
                ]
                for m in queryset
            ]

        elif tipo == 'asistencias':
            queryset = Asistencia.objects.all()
            filename = 'reporte_asistencias.csv'
            headers = ['Canino', 'Fecha', 'Presente']
            rows = [
                [a.matricula.nombre_canino, a.fecha, 'Sí' if a.presente else 'No']
                for a in queryset
            ]

        else:
            return Response({'error': 'Tipo de reporte no válido'}, status=400)

        #Crear archivo CSV
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = f'attachment; filename="{filename}"'

        writer = csv.writer(response)
        writer.writerow(headers)
        writer.writerows(rows)

        return response
    
class DashboardClienteView(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        cliente = request.user
        
        # MATRÍCULAS SOLO DEL CLIENTE
        matriculas = Matricula.objects.filter(canino__cliente=cliente)
        caninos_data = CaninoMatriculadoSerializer(matriculas, many=True).data
        
        # ASISTENCIAS SOLO DEL CLIENTE
        asistencias_qs = (
            Asistencia.objects
            .filter(matricula__canino__cliente=cliente)
            .values('matricula__canino__nombre')
            .annotate(total_asistencias=Count('id'))
        )
        
        asistencias_data = [
            {'nombre_canino': a['matricula__canino__nombre'], 'total_asistencias': a['total_asistencias']}
            for a in asistencias_qs
        ]
        
        data = {
            'caninos_matriculados': caninos_data,
            'asistencias': asistencias_data
        }
        
        return Response(DashboardClienteSerializer(data).data)
