from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EquipoViewSet, MantenimientoViewSet, DashboardCliente

# Crear el router
router = DefaultRouter()
router.register(r'equipos', EquipoViewSet, basename='equipo')
router.register(r'mantenimientos', MantenimientoViewSet)

urlpatterns = [
    path('dashboard-cliente/', DashboardCliente.as_view(), name='dashboard-cliente'),
    path('', include(router.urls)),
]
