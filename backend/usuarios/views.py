from rest_framework import generics, viewsets
from .models import Usuario, Equipo
from .serializers import UsuarioSerializer, RegistroSerializer, EquipoSerializer
from rest_framework.permissions import IsAuthenticated

class RegistroView(generics.CreateAPIView):
    serializer_class = RegistroSerializer

class PerfilView(generics.RetrieveUpdateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

class EquipoViewSet(viewsets.ModelViewSet):
    queryset = Equipo.objects.all()
    serializer_class = EquipoSerializer