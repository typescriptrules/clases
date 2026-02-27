# Servicio Simple de Monitoreo de API

## ¿Qué hace?
- Hace peticiones a tu API cada 2 minutos
- Guarda los logs en un archivo
- Envía un email diario con los logs

## Configuración rápida

1. **Configura tu email** (crea un archivo `.env`):
```env
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_app_password
EMAIL_TO=destino@example.com
```

2. **Para Gmail**:
   - Ve a https://myaccount.google.com/apppasswords
   - Genera una contraseña de aplicación para "Mail"
   - Usa esa contraseña en `EMAIL_PASS`

## Cómo usar

1. **Asegúrate que tu API esté corriendo**:
```bash
npm run dev
```

2. **Ejecuta el monitor**:
```bash
node api-monitor.js
```

## ¿Qué hace exactamente?

### Peticiones automáticas
- `GET /users` - cada 2 minutos
- `GET /books` - cada 2 minutos  
- `GET /users/performance-test` - cada 2 minutos

### Logs
- Se guardan en `./logs/api-logs.txt`
- Formato: `fecha - método url - status - tiempo`

### Email diario
- Se envía a las 8:00 AM
- Incluye logs del día
- Adjunta archivo con logs

## Ejemplo de log
```
2024-01-15T10:30:00.000Z - GET /users - Status: 200 - Tiempo: 150ms
2024-01-15T10:30:01.000Z - GET /books - Status: 200 - Tiempo: 200ms
2024-01-15T10:30:02.000Z - GET /users/performance-test - Status: 200 - Tiempo: 300ms
```

## Comandos útiles

```bash
# Ver logs en tiempo real
tail -f logs/api-logs.txt

# Ver solo logs de hoy
grep "$(date +%Y-%m-%d)" logs/api-logs.txt

# Ejecutar solo una vez (sin cron)
node -e "require('./api-monitor.js')"
```

¡Eso es todo! Simple y funcional.
