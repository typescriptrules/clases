# Clases sobre Express con Node

## ¿Qué es el package.json y qué significa?

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

## ¿Qué es el tsconfig y qué significa?

Este archivo es como el manual de reglas que le dice a TypeScript:
“oye, así quiero que traduzcas mi cuaderno en TypeScript para que lo entienda JavaScript”.

```json
{
  "compilerOptions": {
```
Aquí abrimos la sección de opciones del compilador.
El compilador es el traductor que convierte TypeScript → JavaScript.

```json
  "outDir": "./dist",
```
Aquí decimos en qué carpeta queremos guardar el resultado.
Cuando TypeScript traduzca tu código, lo pondrá en la carpeta dist.
Es como tener una caja donde guardamos todos los cuadernos ya traducidos.

```json
  "module": "nodenext",
```
Define el sistema de módulos.
“nodenext” significa que vamos a usar la forma moderna de importar y exportar cosas (import y export) como lo hace Node.

```json
  "target": "esnext",
```
Aquí decimos hasta qué versión de JavaScript queremos que lo traduzca.
esnext significa: la versión más nueva posible.
Así aprovechamos lo último que existe en JavaScript.

```json
  "lib": ["esnext"],
```
Le decimos qué bibliotecas queremos que conozca.
Con ["esnext"] le decimos: “entiende todo lo nuevo de JavaScript moderno”.

```json
  "types": ["node"],
```
Le pedimos que cargue los tipos de Node.js.
Esto permite que TypeScript sepa qué es process, __dirname, etc.

```json
  "sourceMap": true,
```
Con esto generamos un mapa de fuentes.
Sirve para que, aunque el código se traduzca, las herramientas (como un debugger) puedan mostrarte dónde ocurrió el error en el archivo TypeScript original y no en el traducido.

```json
  "declaration": true,
```
Le decimos que genere archivos .d.ts.
Son como diccionarios que explican cómo usar lo que escribimos.
Muy útil si alguien más quiere usar nuestro código.

```json
  "declarationMap": true,
```
Relaciona esos diccionarios (.d.ts) con los mapas de fuente.
Así tenemos aún mejor información cuando depuramos.

```json
  "noUncheckedIndexedAccess": true,
```
Es una regla estricta: cada vez que accedamos a un arreglo o a un objeto con índices, TypeScript asumirá que podría ser undefined.
Es como que el profe siempre diga: “¿Seguro que esa casilla no está vacía?”.

```json
  "exactOptionalPropertyTypes": true,
```
Otra regla estricta: si algo es opcional (?), solo puede ser exactamente opcional.
Ejemplo: name?: string significa que puede ser un texto o puede no existir, pero no puede ser undefined “por accidente”.

```json
  "strict": true,
```
Este es el modo estricto.
Es como poner al profe más exigente: te revisa que todo esté bien tipado, sin errores escondidos.

```json
  "jsx": "react-jsx",
```
Esto le dice cómo manejar archivos con JSX (lo que usamos en React).
“react-jsx” es el formato moderno recomendado por React.

```json
  "verbatimModuleSyntax": true,
```
Significa que TypeScript no cambiará la forma en que escribes import o export.
Si tú dices import { x } from "./file.js", se quedará así, sin inventar otra cosa.

```json
  "isolatedModules": true,
```
Cada archivo se compila de manera independiente.
Es como corregir tarea por tarea, en vez de mirar todo el cuaderno al mismo tiempo.
Esto ayuda cuando usamos herramientas como Babel o esbuild.

```json
  "noUncheckedSideEffectImports": true,
```
Evita que se hagan imports que solo ejecutan código sin usarlos explícitamente.
Ejemplo malo: 
```ts 
import "./setup"; // solo corre cosas, no importa nada 
```
Con esta regla, TypeScript dirá: “¡hey, importa algo de verdad o no lo traigas!”.

```json
  "moduleDetection": "force",
```
Le dice a TypeScript que fuerce la detección de módulos en todos los archivos.
Así no depende de si usas import o export: siempre tratará el archivo como un módulo.

```json
  "skipLibCheck": true,
```
Esto le dice a TypeScript: “no revises todas las librerías” porque eso puede ser muy lento.
Es como confiar en que los libros de la biblioteca ya están bien escritos y no revisarlos.

```json
  "allowImportingTsExtensions": true
```
Esto permite que importemos archivos con la extensión .ts.
Ejemeplo:
```ts
import { algo } from "./archivo.ts";
```
Resumen para novatos:

- outDir: dónde guardar los cuadernos traducidos.

- module y target: cómo hablar (lenguaje moderno).

- lib y types: qué diccionarios usar.

- sourceMap y declaration: mapas y diccionarios extras.

- strict y demás reglas: profe estricto que no deja pasar errores.

- jsx: cómo dibujar React.

- skipLibCheck: confía en los libros de la biblioteca.

### Para no hacer este readme más largo, saltar al siguiente
CLick [Aqui]() Para ir al siquiente.
