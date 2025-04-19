from django.db import models
from usuarios.models import Usuario
from equipos.models import Equipo

class Mantenimiento(models.Model):
    TIPO_CHOICES = [
        ('preventivo', 'Preventivo'),
        ('correctivo', 'Correctivo'),
    ]
    equipo = models.ForeignKey(Equipo, on_delete=models.CASCADE)
    descripcion = models.TextField()
    tecnico = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, blank=True, limit_choices_to={'rol': 'tecnico'})
    fecha = models.DateTimeField(auto_now_add=True)
    estado = models.CharField(max_length=20, choices=[('pendiente', 'Pendiente'), ('completado', 'Completado')])
    tipo_mantenimiento = models.CharField(max_length=20, choices=TIPO_CHOICES, default='preventivo')
    cliente = models.ForeignKey(Usuario, related_name='mantenimientos', on_delete=models.CASCADE, null=True, blank=True)