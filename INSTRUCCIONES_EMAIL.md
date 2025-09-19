# 📧 Configuración de Email para API Services

## Pasos para configurar el envío de emails:

### 1. Crear archivo .env
Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```
PORT=3001
MAIL_USER=tu_email@gmail.com
MAIL_PASS=tu_app_password
TEST_EMAIL_RECIPIENT=tu_email_de_destino@example.com
CRON_EMAIL_RECIPIENT=tu_email_de_destino_cron@example.com
```

### 2. Configurar Gmail App Password
Para usar Gmail, necesitas crear una "Contraseña de aplicación":

1. Ve a tu cuenta de Google
2. Configuración > Seguridad
3. Activa la verificación en 2 pasos si no está activada
4. Ve a "Contraseñas de aplicaciones"
5. Selecciona "Correo" y "Otro (nombre personalizado)"
6. Ponle un nombre como "API Services"
7. Copia la contraseña generada y úsala como `MAIL_PASS`

### 3. Cambiar el email de destino
En el archivo `src/controllers/apiController.ts`, línea 25, cambia:
```typescript
"usuario@correo.com" // por tu email real
```

También en `src/utils/cronJob.ts`, línea 16, cambia:
```typescript
"usuario@correo.com" // por tu email real
```

### 4. Probar el envío de email
Una vez configurado, puedes probar el envío de email visitando:
```
http://localhost:3001/api/test-email
```

### 5. Cronjob automático
El cronjob está configurado para ejecutarse cada 2 minutos y enviar un reporte de precios de criptomonedas.

## Endpoints disponibles:
- `GET /api/data` - Obtener precios de criptomonedas
- `GET /api/test-email` - Enviar email de prueba
- `GET /users` - Listar usuarios
- `POST /users` - Crear usuario
- `GET /users/:id` - Obtener usuario por ID
- `PUT /users/:id` - Actualizar usuario
- `DELETE /users/:id` - Eliminar usuario
