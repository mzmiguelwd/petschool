from django.urls import path, include
from rest_framework import routers
from dashboard import views

router = routers.DefaultRouter()
router.register(r'dashboard/director', views.DashboardDirectorView, basename='dashboard_director')

urlpatterns = [
    path('', include(router.urls)),
    path('dashboard/reporte/<str:tipo>/', views.ReporteCSVView.as_view(), name='reporte_csv'),
]
