from django.db import models
from usuarios.models import Usuario

class Equipo(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    cliente = models.ForeignKey(Usuario, on_delete=models.CASCADE, limit_choices_to={'rol': 'cliente'})
    def __str__(self):
            return self.nombre
class Mantenimiento(models.Model):
    equipo = models.ForeignKey(Equipo, related_name='mantenimientos', on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)
    tipo_mantenimiento = models.CharField(max_length=100)

    def __str__(self):
        return f"Mantenimiento de {self.equipo} en {self.fecha}"