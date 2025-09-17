import "dotenv/config"
import express from 'express'
import path from 'path'
import { corsConfig } from './middlewares/cors.middleware.ts'
import { router, initRoutes } from './routes/index.ts'
import { router as booksRouter } from './routes/books.ts'

const PORT = process.env.PORT || 3003

const app = express()

// Middleware CORS personalizado
app.use(corsConfig)
app.use(express.json())

// Servir archivos estáticos (para el index.html)
app.use(express.static('.'))

app.use('/books', booksRouter)

await initRoutes()
app.use(router)



app.listen(PORT, () => {
    console.log("Servidor corriendo en 3003")
})