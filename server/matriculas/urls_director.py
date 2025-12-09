# server/matriculas/urls_director.py
from django.urls import path
from matriculas.views.director import DirectorAsistenciaView


urlpatterns = [
    path("asistencia/", DirectorAsistenciaView.as_view(), name="asistencia-director"),
]
