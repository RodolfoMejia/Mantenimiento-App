from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Equipo, Mantenimiento
from .serializers import EquipoSerializer, MantenimientoSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied


# Permiso personalizado para verificar si el usuario es un técnico
class IsTecnico(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.rol == 'tecnico'  # Verifica que el rol del usuario sea 'tecnico'


# ViewSet para el modelo Equipo
class EquipoViewSet(viewsets.ModelViewSet):
    queryset = Equipo.objects.all()
    serializer_class = EquipoSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.rol == 'cliente':
            # Si el usuario es un cliente, solo puede ver los equipos asignados a él
            return self.queryset.filter(cliente=user)
        return self.queryset  # Si es técnico, puede ver todos los equipos

    def perform_create(self, serializer):
        user = self.request.user
        if user.rol == 'cliente':  # Solo un cliente puede crear equipos para sí mismo
            serializer.save(cliente=user)  # Asignar al cliente autenticado
        else:
            raise PermissionDenied("Solo los clientes pueden crear equipos")


# ViewSet para el modelo Mantenimiento
class MantenimientoViewSet(viewsets.ModelViewSet):
    queryset = Mantenimiento.objects.all()
    serializer_class = MantenimientoSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.rol == 'cliente':
            # Si es cliente, solo podrá ver sus mantenimientos
            equipos = Equipo.objects.filter(cliente=user)
            return self.queryset.filter(equipo__in=equipos)
        return self.queryset  # Si es técnico, puede ver todos los mantenimientos


# Vista para el Dashboard del Cliente
class DashboardCliente(APIView):
    def get(self, request, *args, **kwargs):
        # Filtra los equipos y mantenimientos relacionados con el usuario logueado
        equipos = Equipo.objects.filter(cliente=request.user)
        mantenimientos = Mantenimiento.objects.filter(equipo__in=equipos)

        # Serializa los equipos y mantenimientos
        equipos_serializer = EquipoSerializer(equipos, many=True)
        mantenimientos_serializer = MantenimientoSerializer(mantenimientos, many=True)

        return Response({
            'equipos': equipos_serializer.data,
            'mantenimientos': mantenimientos_serializer.data
        })

