from django.db import transaction
from django.utils import timezone
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import date, timedelta
from ..models import Matricula, Asistencia, Canino
from ..serializers import MatriculaSerializer, AsistenciaBulkSerializer


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


PLAN_DURACIONES = {
    '1_mes': 30,
    '1_bimestre': 60,
    '1_trimestre': 90,
    '6_meses': 180,
    '1_anio': 365,
}


class IsClienteDueño(permissions.BasePermission):
    """
    Solo el dueño del canino puede crear/actualizar/borrar matrículas del canino.
    """
    def has_object_permission(self, request, view, obj):
        return obj.cliente == request.user


class MatriculaViewSet(viewsets.ModelViewSet):
    serializer_class = MatriculaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.is_staff:
            return Matricula.objects.all()

        return Matricula.objects.filter(canino__cliente=user)


    # --------------------------------------------------------------------
    # ✔️ Validar antes de crear matrícula
    # --------------------------------------------------------------------
    def perform_create(self, serializer):
        user = self.request.user
        canino_id = serializer.validated_data.get("canino").id

        # 1. Validar que el canino pertenece al usuario
        try:
            canino = Canino.objects.get(id=canino_id, cliente=user)
        except Canino.DoesNotExist:
            raise serializers.ValidationError("No tienes permiso para matricular este canino.")

        # 2. Validar que no tenga matrícula activa
        matricula_activa = Matricula.objects.filter(
            canino=canino,
            estado="aprobada",
            fecha_vencimiento__gte=timezone.now().date()
        ).exists()

        if matricula_activa:
            raise serializers.ValidationError("Este canino ya tiene una matrícula activa.")

        # 3. Calcular fecha de vencimiento
        plan = serializer.validated_data["plan"]
        fecha_inicio = serializer.validated_data["fecha_inicio"]

        dias = PLAN_DURACIONES.get(plan, 30)
        fecha_vencimiento = fecha_inicio + timedelta(days=dias)

        # 4. Guardar matrícula
        serializer.save(
            cliente=user,
            fecha_vencimiento=fecha_vencimiento
        )

    # --------------------------------------------------------------------
    # ✔️ Validación en updates
    # --------------------------------------------------------------------
    def perform_update(self, serializer):
        matricula = self.get_object()

        if matricula.cliente != self.request.user:
            raise serializers.ValidationError("No puedes modificar una matrícula que no te pertenece.")

        new_canino = serializer.validated_data.get("canino", matricula.canino)

        # Validar dueño si cambian el canino
        if new_canino.cliente != self.request.user:
            raise serializers.ValidationError("No puedes asignar un canino que no te pertenece.")

        # Recalcular fecha si cambian plan o fecha_inicio
        plan = serializer.validated_data.get("plan", matricula.plan)
        fecha_inicio = serializer.validated_data.get("fecha_inicio", matricula.fecha_inicio)

        dias = PLAN_DURACIONES.get(plan, 30)
        fecha_vencimiento = fecha_inicio + timedelta(days=dias)

        serializer.save(fecha_vencimiento=fecha_vencimiento)

    # --------------------------------------------------------------------
    # ✔️ Delete protegido
    # --------------------------------------------------------------------
    def perform_destroy(self, instance):
        if instance.cliente != self.request.user:
            raise serializers.ValidationError("No puedes eliminar esta matrícula.")

        instance.delete()

    # --------------------------------------------------------------------
    # ✔️ Acción: cambiar estado (solo admin)
    # --------------------------------------------------------------------
    @action(detail=True, methods=['post'])
    def cambiar_estado(self, request, pk=None):
        matricula = self.get_object()

        if not request.user.is_staff:
            return Response({"error": "No autorizado"}, status=403)

        estado = request.data.get("estado")

        if estado not in dict(Matricula._meta.get_field('estado').choices):
            return Response({"error": "Estado inválido"}, status=400)

        matricula.estado = estado
        matricula.save()
        return Response({"status": "Estado actualizado"})
