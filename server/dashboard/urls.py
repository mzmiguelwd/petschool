from django.urls import path, include
from rest_framework import routers
from dashboard import views

router = routers.DefaultRouter()
router.register(r'dashboard/director', views.DashboardDirectorView, basename='dashboard_director')
router.register(r'dashboard/cliente', views.DashboardClienteView, basename='dashboard_cliente')

urlpatterns = [
    path('', include(router.urls)),
    path('dashboard/reporte/<str:tipo>/', views.ReporteCSVView.as_view(), name='reporte_csv'),
]

