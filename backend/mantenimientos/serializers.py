from rest_framework import serializers
from .models import Mantenimiento

class MantenimientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mantenimiento
        fields = '__all__'
        read_only_fields = ['tecnico', 'fecha']  # opcional: evitar que el cliente edite esto

    def create(self, validated_data):
        # Forzar valores por defecto
        validated_data['estado'] = 'pendiente'
        validated_data['descripcion'] = 'Solicitud creada por el cliente'
        return super().create(validated_data)
