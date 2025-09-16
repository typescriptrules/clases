import "dotenv/config"
import express from 'express'
import cors from 'cors'
import { router, initRoutes } from './routes/index.ts'
import { router as booksRouter } from './routes/books.ts'

const PORT = process.env.PORT || 3003

const app = express()

app.use(cors())
app.use(express.json())

app.use('/books', booksRouter)

await initRoutes()
app.use(router)



app.listen(PORT, () => {
    console.log("Servidor corriendo en 3003")
})