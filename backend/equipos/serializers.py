from rest_framework import serializers
from .models import Equipo
from mantenimientos.models import Mantenimiento


class MantenimientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mantenimiento
        fields = ['fecha', 'tipo_mantenimiento']


class EquipoSerializer(serializers.ModelSerializer):
    ultimo_mantenimiento = serializers.SerializerMethodField()

    class Meta:
        model = Equipo
        fields = ['id', 'nombre', 'descripcion', 'cliente', 'ultimo_mantenimiento']

    def get_ultimo_mantenimiento(self, obj):
        mantenimiento = Mantenimiento.objects.filter(equipo=obj).order_by('-fecha').first()
        if mantenimiento:
            return MantenimientoSerializer(mantenimiento).data
        return None
