# Clases sobre Express con Node

Imagina que el package.json es la hoja de instrucciones de tu proyecto. Es como el cartel de un salón de clase que dice:

- cómo se llama el salón,

- qué reglas tiene,

- quién lo creó,

- y qué materiales necesitas para aprender.

```json
{
  "name": "clases",
```

Aquí decimos cómo se llama el proyecto.
Es como ponerle nombre a tu cuaderno: "clases".

```json
  "version": "1.0.0",
```
Esta es la versión del proyecto.
Piensa en la versión como niveles de un videojuego:

1.0.0 → el primer nivel, lo básico.

Luego podrías hacer 1.1.0 (si agregas cosas nuevas) o 1.0.1 (si corriges un error chiquito).

```json
"description": "",
```
Aquí puedes escribir una descripción corta de tu proyecto.
Ejemplo: "Una app para la clase de programación".


```json
  "main": "index.js",
```
Este es el archivo principal.
Es como decir: "si alguien quiere abrir mi cuaderno, que empiece por la primera página llamada index.js".

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "ts-node-dev --respawn --transpileOnly ./index.ts",
    "listen": "nodemon ./src/app.ts"
  },
```
Los scripts son como atajos mágicos.
En lugar de escribir un comando largo en la consola, puedes usar una palabra cortita.

"test" → ahora mismo no hace nada útil, solo muestra un mensaje.

"dev" → sirve para ejecutar el proyecto en modo desarrollo usando ts-node-dev (traduce TypeScript a JavaScript y reinicia el servidor si cambias algo).

"listen" → usa nodemon para escuchar los cambios en app.ts y reiniciar solo.

Ejemplo: ```npm run dev``` es como decir: "¡Corre el servidor en modo práctica!"

```json
  "author": "",
```
👉 Aquí se escribe quién hizo el proyecto.
Como firmar tu tarea: "Carlos Andrés" ✍️.

```json
  "license": "ISC",
```
Esto dice qué tipo de licencia tiene el proyecto.
En palabras simples: si otros pueden usarlo, copiarlo o modificarlo. "ISC" significa: "¡Sí, puedes usarlo libremente!".

```json
  "type": "module",
```
Aquí decimos que vamos a usar módulos modernos de JavaScript.
En lugar de escribir require, usaremos import y export.

```json
  "devDependencies": {
    "@types/axios": "^0.14.4",
    "@types/cors": "^2.8.19",
    "@types/express": "^5.0.3",
    "@types/node": "^24.3.1",
    "ts-node": "^10.9.2",
    "ts-node-dev": "^2.0.0",
    "nodemon": "^3.1.10"
  },
```
Estas son las herramientas de apoyo para cuando estamos desarrollando.
No son necesarias en el proyecto final, solo nos ayudan a trabajar mejor.

@types/... → son como diccionarios que le dicen a TypeScript cómo se llaman y qué hacen las cosas de esas librerías.

ts-node y ts-node-dev → sirven para ejecutar TypeScript directamente sin tener que convertirlo a JavaScript manualmente.

"nodemon" sirve para mantener un servidor en ejecución sin compilar el código antes, es como para mantenerlo en modo de prueba y para correr con TS, necesita ts-node

```json
  "dependencies": {
    "axios": "^1.12.2",
    "cors": "^2.8.5",
    "dotenv": "^17.2.2",
    "express": "^5.1.0",
    "multer": "^2.0.2",
    "node-cron": "^3.0.3",
    "nodemailer": "^6.9.8"
  },
```
Estas son las herramientas principales de nuestro proyecto.
Son como los colores, tijeras y reglas que SÍ vamos a usar en clase.

axios → para hacer peticiones a internet.

cors → para dar permisos de conexión entre el servidor y otros.

dotenv → para guardar secretos (como contraseñas) en un archivo .env.

express → para crear servidores fácilmente.

multer → para manejar archivos que los usuarios suben.

node-cron → para programar tareas automáticas (como despertadores).

nodemailer → para enviar correos desde la app.

```json
  "keywords": []
}
```
Aquí puedes poner palabras clave de tu proyecto, como etiquetas.
Ejemplo: ```["node", "express", "clase"].```

Resumen:

- name = tu cuaderno.

- version = nivel del videojuego.

- description = qué hace.

- main = primera página.

- scripts = atajos mágicos.

- author = quién lo hizo.

- license = permisos.

- type = tipo de lenguaje.

- devDependencies = herramientas de práctica.

- dependencies = materiales principales.

- keywords = etiquetas.
