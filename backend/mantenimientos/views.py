from rest_framework import viewsets
from .models import Mantenimiento
from .serializers import MantenimientoSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from equipos.models import Equipo  # Asegúrate de importar el modelo Equipo

class MantenimientoViewSet(viewsets.ModelViewSet):
    queryset = Mantenimiento.objects.all()
    serializer_class = MantenimientoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = Mantenimiento.objects.all()

        # Filtra los mantenimientos según el rol del usuario
        if user.rol == 'cliente':
            queryset = queryset.filter(equipo__cliente=user)
        elif user.rol == 'tecnico':
            queryset = queryset.filter(tecnico=user)

        return queryset.select_related('equipo', 'tecnico')

    def perform_create(self, serializer):
        user = self.request.user
        equipo_id = self.request.data.get('equipo')  # Obtiene el ID del equipo

        if not equipo_id:
            raise ValidationError("El campo 'equipo' es obligatorio.")  # Valida que el campo equipo esté presente

        try:
            equipo = Equipo.objects.get(pk=equipo_id)  # Obtiene el objeto Equipo
        except Equipo.DoesNotExist:
            raise ValidationError("El equipo no existe.")  # Si no existe, genera un error

        # Lógica de acuerdo al rol del usuario
        if user.rol == 'cliente':
            if equipo.cliente != user:
                raise ValidationError("Este equipo no te pertenece.")  # Verifica que el equipo pertenezca al cliente
            serializer.save(cliente=user, equipo=equipo)
        elif user.rol == 'tecnico':
            serializer.save(tecnico=user, equipo=equipo)
        else:
            raise ValidationError("El rol no está permitido para crear un mantenimiento.")
