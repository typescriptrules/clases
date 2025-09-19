# clases-Node-JJQB

Este proyecto es una API construida con Node.js y TypeScript, diseñada para gestionar usuarios y servicios relacionados. Incluye autenticación, validaciones, envío de correos y tareas programadas.

## Características principales
- API RESTful con rutas para usuarios y servicios.
- Validación de datos y manejo de errores.
- Envío de correos electrónicos.
- Tareas programadas con cron.
- Registro de logs.

## Estructura del proyecto
```
src/
  app.ts                # Punto de entrada de la aplicación
  config/               # Configuración (email, etc.)
  controllers/          # Lógica de controladores para rutas
  interfaces/           # Definición de interfaces TypeScript
  middlewares/          # Middlewares personalizados
  routes/               # Definición de rutas
  services/             # Lógica de negocio y servicios
  utils/                # Utilidades (cron, logger, etc.)
db.json                 # Base de datos simulada
nodemon.json            # Configuración de nodemon
tsconfig.json           # Configuración de TypeScript
package.json            # Dependencias y scripts
```

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Quiro66/clases-Node-JJQB.git
   cd clases-Node-JJQB
   ```
2. Instala las dependencias:
   ```bash
   pnpm install
   ```
3. Copia el archivo de entorno y configura tus variables:
   ```bash
   cp env.example .env
   # Edita .env según tus necesidades
   ```

## Uso

- Para desarrollo:
  ```bash
  pnpm run dev
  ```
- Para producción:
  ```bash
  pnpm start
  ```

## Scripts útiles
- `pnpm run dev`: Inicia el servidor en modo desarrollo con nodemon.
- `pnpm start`: Compila y ejecuta el servidor en modo producción.

## Autor
Juan José Quiroz

---
¡Contribuciones y sugerencias son bienvenidas!
