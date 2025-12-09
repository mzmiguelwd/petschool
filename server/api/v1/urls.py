# server/api/v1/urls.py
from django.urls import path, include


urlpatterns = [
    path('users/', include('users.urls')),
    path('dashboard/', include('dashboard.urls')),
    path('matriculas/', include('matriculas.urls_matriculas')),
    path("caninos/", include("matriculas.urls_caninos")),
    path("director/", include("matriculas.urls_director")),

]