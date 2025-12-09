from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views.matriculas import MatriculaViewSet

router = DefaultRouter()
router.register(r"", MatriculaViewSet, basename="matriculas")

urlpatterns = [
    path("", include(router.urls)),
]
