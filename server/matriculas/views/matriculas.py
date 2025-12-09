from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.utils import timezone
from datetime import timedelta

from ..models import Matricula, Canino
from ..serializers import MatriculaSerializer


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
