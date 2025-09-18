# Ahora sí, baby steps para Express

Primero los pasos para crear la carpeta y el archivo en la terminal (copiar/pegar):

```bash
npm install
mkdir -p src
cat > src/app.ts <<'TS'
```
Esto instalará los paquetes necesarios y luego creará la carpeta src y el archivo app.ts

## Explicación simple, línea por línea (como para niños)
```ts
import "dotenv/config"
```
- Imagina una cajita con secretos (archivo .env). Esta línea abre la cajita y pone los valores adentro de process.env, así el código puede leer contraseñas o el número del puerto. Es como sacar las instrucciones de una bolsita y ponerlas en la mesa.
```ts
import express from 'express'
```
- Traemos a Express, que es como un maestro que organiza la clase: recibe peticiones (niños que levantan la mano) y responde. Con Express construimos el servidor.

```ts
import cors from 'cors'
```
- cors es una pegatina de permiso. Si un sitio web diferente quiere hablar con tu servidor, necesita esa pegatina. cors() se la pega al servidor para permitir que otras páginas envíen peticiones.

```ts
import { router, initRoutes } from './routes/index.ts'
```
- Esto trae el mapa de puertas (router) y una llave mágica (initRoutes) que prepara esas puertas.

router es el lugar donde ponemos las direcciones (por ejemplo: /usuarios, /login),

initRoutes() es una función que puede crear esas direcciones, quizás leyendo cosas o preparando datos antes de abrir las puertas.
```ts
const PORT = process.env.PORT || 3001
```
- Aquí decimos: si alguien dejó un número en la cajita de secretos (process.env.PORT), úsalo. Si no, usamos 3001.
Es como decir: “si me dieron un aula, entro ahí; si no, voy al aula 3001”.

```ts
const app = express()
```
- Le pedimos a Express que cree el servidor. app ahora es como el salón de clases donde el maestro (Express) atenderá a la gente.

```ts
app.use(cors())
```
- Le pegamos la pegatina de permiso a todas las peticiones. Ahora el servidor dejará que otras páginas hablen con él.

```ts
app.use(express.json())
```
- Le decimos al servidor: “aprende a leer cartas escritas en formato JSON” (JSON es un lenguaje para enviar datos). Así si alguien te manda { "nombre": "Ana" }, el servidor lo entiende.
```ts
await initRoutes()
```
- Usamos la llave mágica para preparar las puertas. Puse await porque puede tardar un poquito (por ejemplo, si lee archivos o consulta una base de datos). await significa “espera aquí hasta que esté listo”.

Pequeña aclaración técnica: para poder usar await afuera de funciones necesitas tener configurado el proyecto para permitir top-level await (tu tsconfig y package.json ya lo permiten si están como antes).
```ts
app.use(router)
```
- Le decimos al salón: “usa este mapa de puertas”. Con eso las direcciones que definiste en el router empezarán a funcionar.
```ts
app.listen(PORT, () => { console.log(\Servidor corriendo en ${PORT}`) })
```
- Esto **enciende la luz del salón** y pone al maestro a trabajar en el puerto elegido. Cuando ya está listo, ejecuta la función que imprime en consola:Servidor corriendo en 3001` (o el número que sea). Es la forma de decir: “¡ya estamos listos!”.
