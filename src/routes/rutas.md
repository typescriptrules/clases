# 🧠 Qué hace este código index.ts

Este código está hecho con Express y Node.js.
Imagina que estamos construyendo un parque de diversiones 🎡, y cada atracción (ruta) está en un archivo diferente.
Este código es como el organizador del parque 🎟️, que busca todas las atracciones y las abre para que los visitantes puedan entrar.

---

## 📦 Qué hace cada parte

### 🚪 Importaciones

```ts
import { Router } from 'express'
import { readdirSync } from 'fs'
import { fileURLToPath } from "url"
import { dirname, join } from "path"
```

Aquí estamos trayendo herramientas:

- Router es como el mapa del parque 🗺️, donde ponemos las rutas.

- readdirSync es como un explorador que mira qué atracciones hay 🎢 en la carpeta.

- fileURLToPath, dirname y join ayudan a saber dónde estamos parados 📍 dentro del proyecto (Es como el cartel de: Usted está aquí).

### 📍 Saber dónde estamos

```ts
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const PATH_ROUTER = join(__dirname)
```
Esto le dice al programa en qué carpeta está parado para que sepa dónde buscar las rutas (atracciones).

### 🛣️ Crear el router (el mapa)

```ts
const router:Router = Router()
```
Aquí creamos un **router**, que es como un mapa donde vamos a dibujar los caminos que llevan a cada atracción.

### ✂️ Quitar la extensión .ts

```ts
const cleanFileName = (fileName: string) => { 
    return fileName.split('.').shift()
}
```

Esta función quita el .ts del nombre de cada archivo, para que solo quede el nombre bonito de la atracción 🏷️.

### 🧩 Cargar todas las rutas automáticamente

```ts
export async function initRoutes() {
  for (const fileName of readdirSync(PATH_ROUTER)) {
    const cleanName = cleanFileName(fileName)
    if (cleanName !== 'index') {
      const moduleRouter = await import(`./${cleanName}.ts`)
      router.use(`/${cleanName}`, moduleRouter.router)
    }
  }
}
```

Aquí viene la parte mágica ✨:

- Mira todos los archivos de la carpeta (readdirSync).

- Quita el .ts de los nombres (cleanFileName).

- Si el archivo no se llama index (porque ese es el organizador), entonces:

  - Lo importa (como abrir la atracción 🎢).

  - Lo pone en el mapa con el mismo nombre que el archivo.

Así, cada vez que agregamos un nuevo archivo de ruta, este código lo detecta y lo conecta solito 🧠⚡
y así cada ruta se creará con el nombre del archivo, entonces, si tenemos el archivo books.ts entonces las rutas que estén dentro de este, empezarán con '/books'
por eso veremos que en el archivo books.ts de routes no ponemos nombre en la ruta y se deja como '/'.

### 🚀 Exportar el router

```ts
export { router }
```

Por último, exportamos el router para que el resto de la aplicación lo use y sepa todos los caminos que existen en el parque 🎡.

# 🧠 Qué hace este código books.ts

Imagina que tenemos una biblioteca mágica 📚 llena de libros.
Este código es como un bibliotecario 🤓 que sabe cómo se llaman las filas donde los libros están guardados:

Dónde encontrar todos los libros 📚

Dónde econtrar un libro específico 📖

Dónde guardar un libro nuevo 📝

## 🧩 Qué hace cada parte

### 🧰 Traer herramientas

```ts
import { Router, type Request, type Response } from 'express'
import { createBook, getBook, getBooks } from '../controllers/books.ts'
```

Aquí traemos nuestras herramientas:

- Router: es el mapa de caminos 🗺️ para decir qué hacer cuando alguien pide algo.

- Request y Response: son las cartitas 📬 que envían los visitantes y las respuestas 📩 que les damos.

- createBook, getBook, getBooks: son los trabajadores mágicos 🧙 que hacen el trabajo con los libros.

### 🗺️ Crear el router

```ts
const router:Router = Router()
```

Creamos un router, que es como un mapa que dice a dónde va cada camino dentro de nuestra biblioteca.

### 🚪 Crear las puertas (rutas)

```ts
router.get("/", (req:Request, res:Response)=> {
    console.log("vamos ok")
    getBooks(req, res)
})
```

Cuando alguien visita la entrada principal /books:

Mostramos un mensaje en la consola (como decir "¡Hola visitante! 👋").

Luego llamamos a getBooks, que es el que busca todos los libros y se los muestra 📚.

```ts
router.get('/:id', getBook)
```

Cuando alguien visita /books/123 (o cualquier número):

Llamamos a getBook, que busca ese libro específico 📖 y se lo muestra al visitante.

```ts
router.post('/', createBook)
```

Cuando alguien manda un nuevo libro:

Llamamos a createBook, que guarda ese libro en la biblioteca 📝.

### 🚀 Exportar el router
```ts
export { router }
```

Finalmente, sacamos el mapa de rutas para que el resto de la aplicación lo use 🗺️
Así todos sabrán cómo llegar a los libros.