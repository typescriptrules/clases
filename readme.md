# User History API

API para obtener información de Pokémon y enviar resúmenes diarios por correo electrónico.

## Requisitos Previos

- Node.js (v18 o superior)
- npm

## Configuración

1. Clona este repositorio.
2. Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```
PORT=3001
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_contraseña_de_aplicacion
EMAIL_TO=destinatario@example.com
```

- `PORT`: El puerto en el que se ejecutará el servidor.
- `EMAIL_USER`: La dirección de correo electrónico de Gmail que se utilizará para enviar correos.
- `EMAIL_PASS`: La contraseña de aplicación para la cuenta de Gmail. (Nota: No es la contraseña de tu cuenta, sino una contraseña de aplicación generada).
- `EMAIL_TO`: La dirección de correo electrónico que recibirá los resúmenes.

## Instalación

Instala las dependencias del proyecto con npm:

```bash
npm install
```

## Ejecución

Para iniciar el servidor en modo de desarrollo, ejecuta:

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3001` (o el puerto que hayas configurado en `.env`).

## Endpoints de la API

### `GET /`

Devuelve un mensaje de bienvenida.

- **Respuesta:**
  - `200 OK`: `Servidor Express con TypeScript funcionando 🚀`

### `GET /ping`

Devuelve "pong". Se puede utilizar para comprobar si el servidor está activo.

- **Respuesta:**
  - `200 OK`: `pong`

### `GET /pokemon/:name`

Obtiene información sobre un Pokémon específico desde la PokeAPI.

- **Parámetros:**
  - `name` (string, requerido): El nombre del Pokémon.

- **Respuesta:**
  - `200 OK`:
    ```json
    {
      "name": "pikachu",
      "id": 25,
      "height": 4,
      "weight": 60,
      "types": ["electric"]
    }
    ```
  - `400 Bad Request`: Si no se proporciona un nombre de Pokémon.
  - `404 Not Found`: Si el Pokémon no se encuentra.
  - `500 Internal Server Error`: Si ocurre un error en el servidor.

## Tareas Programadas

- **Resumen diario por correo electrónico:** Todos los días a las 8:00 AM, se envía un correo electrónico de resumen a la dirección especificada en `EMAIL_TO`.
- **Log diario:** Todos los días a las 9:00 AM, se imprime un mensaje en la consola.

## Estructura del Proyecto

```
.
├── .env                # Archivo de variables de entorno
├── app.ts              # Punto de entrada de la aplicación
├── package.json        # Dependencias y scripts del proyecto
├── tsconfig.json       # Configuración de TypeScript
├── src/
│   ├── routes/
│   │   ├── apiService.ts # Rutas para la API de Pokémon
│   │   └── index.ts      # Enrutador dinámico (actualmente no utilizado)
│   └── services/
│       ├── apiService.ts # Lógica para interactuar con la PokeAPI
│       └── emailService.ts # Lógica para enviar correos electrónicos
└── ...
```

## Nota sobre el Enrutamiento

El archivo `src/routes/index.ts` contiene un enrutador dinámico que puede cargar automáticamente todas las rutas definidas en el directorio `src/routes`. Actualmente, `app.ts` solo utiliza explícitamente el enrutador de `src/routes/apiService.ts`. Para habilitar el enrutamiento dinámico, se debería llamar a la función `initRoutes` de `src/routes/index.ts` en `app.ts`.
