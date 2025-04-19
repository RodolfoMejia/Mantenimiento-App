 Despliegue de Mantenimiento-App

 Requisitos previos

- Python 3.10+
- Node.js 18+
- PostgreSQL o SQLite (según configuración)
- Git

---

 Backend (Django)

1. Clonar el proyecto:

   ```bash
   git clone https://github.com/RodolfoMejia/Mantenimiento-App.git
   cd Mantenimiento-App/backend
   ```

2. Crear y activar entorno virtual:

   ```bash
   python -m venv venv
   source venv/bin/activate  # En Windows: venv\Scripts\activate
   ```

3. Instalar dependencias:

   ```bash
   pip install -r requirements.txt
   ```

4. Aplicar migraciones:

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. Crear superusuario:

   ```bash
   python manage.py createsuperuser
   ```

6. Correr el servidor:

   ```bash
   python manage.py runserver
   ```

---

 Frontend (React)

1. Ir a la carpeta del frontend:

   ```bash
   cd ../frontend
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Correr el servidor:

   ```bash
   npm run dev
   ```

---

 Listo

Accede al frontend en `http://localhost:5173` y al backend en `http://127.0.0.1:8000`.
