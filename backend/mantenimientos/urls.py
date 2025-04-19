from rest_framework.routers import DefaultRouter
from .views import MantenimientoViewSet

# Crear el router
router = DefaultRouter()
router.register(r'mantenimientos', MantenimientoViewSet)

# Registrar las rutas del router
urlpatterns = router.urls
