from django.contrib import admin
from .models import Usuario, Equipo

# Registrar el modelo Usuario para que se muestre en el admin
admin.site.register(Usuario)
admin.site.register(Equipo)
