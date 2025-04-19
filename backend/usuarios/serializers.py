from rest_framework import serializers
from .models import Usuario, Equipo

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'email', 'rol']

class RegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['username', 'email', 'password', 'rol']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        rol = validated_data.get('rol', 'cliente')  # Asigna 'cliente' si no se proporciona rol
        user = Usuario.objects.create_user(**validated_data)
        user.rol = rol  # Asigna el rol al usuario
        user.save()
        return user

class EquipoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipo
        fields = '__all__'