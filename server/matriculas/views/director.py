# server/matriculas/views/director.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.utils.dateparse import parse_date
from django.shortcuts import get_object_or_404

from matriculas.models import Matricula, Asistencia, Canino


class DirectorAsistenciaView(APIView):
    """
    Vista para que el director pueda:
    - Ver todos los caninos matriculados un día específico
    - Registrar asistencia en lote
    """
    permission_classes = [permissions.IsAuthenticated]  # y director roles si los tienes

    # --- GET: devolver lista de todos los caninos matriculados ---
    def get(self, request):
        date_str = request.GET.get("date")
        if not date_str:
            return Response({"error": "Debe enviar date=YYYY-MM-DD"}, status=400)

        fecha = parse_date(date_str)
        if not fecha:
            return Response({"error": "Fecha inválida"}, status=400)

        # TODAS LAS MATRÍCULAS ACTIVAS (director ve todas)
        matriculas = Matricula.objects.select_related("canino").all()

        data = []
        for m in matriculas:

            if not m.canino:
                continue


            # Buscar si ya existe asistencia para esa matrícula ese día
            asistencia = Asistencia.objects.filter(matricula=m, fecha=fecha).first()

            data.append({
                "matricula_id": m.id,
                "nombre_canino": m.canino.nombre,
                "raza": m.canino.raza,
                "presente": asistencia.presente if asistencia else False,
                "registrado": True if asistencia else False,
            })

        return Response({"alumnos": data})

    # --- POST: registrar asistencias ---
    def post(self, request):
        """Recibe una lista de asistencias y las guarda."""
        asistencias = request.data

        if not isinstance(asistencias, list):
            return Response({"error": "Debe enviar una lista"}, status=400)

        for item in asistencias:
            matricula_id = item.get("matricula_id")
            presente = item.get("presente", False)
            fecha = parse_date(item.get("fecha"))

            matricula = get_object_or_404(Matricula, id=matricula_id)

            # Crear o actualizar asistencia
            Asistencia.objects.update_or_create(
                matricula=matricula,
                fecha=fecha,
                defaults={"presente": presente}
            )

        return Response({"message": "Asistencias registradas correctamente"}, status=201)
