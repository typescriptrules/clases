import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { initRoutes, router } from './routes/index.ts';

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

await initRoutes()
app.use(router)

app.listen(PORT, () => ( console.log('Servicio con express, NodeJs y TS en puerto', PORT)))
