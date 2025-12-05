# server/dashboard/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    DashboardDirectorView,
    DashboardClienteView,
    ReporteCSVView
)


router = DefaultRouter()
router.register(r'director', DashboardDirectorView, basename='dashboard-director')
router.register(r'cliente', DashboardClienteView, basename='dashboard-cliente')


urlpatterns = [
    path('', include(router.urls)),
    path('reporte/<str:tipo>/', ReporteCSVView.as_view(), name='reporte-csv'),
]