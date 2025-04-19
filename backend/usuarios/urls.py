from django.urls import path, include
from .views import RegistroView, PerfilView, EquipoViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'equipos', EquipoViewSet)

urlpatterns = [
    path('registro/', RegistroView.as_view(), name='registro'),
    path('perfil/', PerfilView.as_view(), name='perfil'),
    path('api/', include(router.urls)),
]