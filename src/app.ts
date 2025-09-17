import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { router, initRoutes } from './routes/index.ts'
import { requestLogger, rateLimiter } from './middlewares/requestLogger.ts' 

const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;
const app = express();

app.use(cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json());
app.use(requestLogger)
app.use(rateLimiter);

await initRoutes();
app.use(router);

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`)
    console.log(`Cliente autorizado en: ${CLIENT_URL}`)
})