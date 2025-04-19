from django.contrib.auth.models import AbstractUser
from django.db import models

class Usuario(AbstractUser):
    ROLES = (
        ('cliente', 'Cliente'),
        ('tecnico', 'Técnico'),
    )
    rol = models.CharField(max_length=255, choices=ROLES)

class Equipo(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    cliente = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name="equipos")  # Relación con el cliente (Usuario)
    fecha_creacion = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.nombre