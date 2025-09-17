import "dotenv/config"
import express from "express"
import cors from "cors"
import { router, initRoutes } from "./routes/index.ts";
import { logger } from "./middlewares/logger.ts";
import { getLogs } from "./utils/logStorage.ts";
import { startCron } from "./utils/cron-job.ts";

const PORT = process.env.PORT || 3002
const app = express()

app.use(cors({
    origin: ["http://localhost:3001", "http://192.168.40.99:3001"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.json())

// logger middleware
app.use(logger)

// endpoint para ver logs
app.get("/logs", (req, res) => {
    res.json(getLogs())
})

// rutas
await initRoutes()
app.use(router)

// arrancar servidor
app.listen(PORT, () => {
    console.log(`Corriendo en puerto ${PORT}`)
})

// arrancar cron después de que el server corre
startCron()
