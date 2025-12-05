# server/matriculas/urls_matriculas.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views.caninos import CaninoViewSet

router = DefaultRouter()
router.register(r"", CaninoViewSet, basename="matriculas")

urlpatterns = [
    path("", include(router.urls)),
]