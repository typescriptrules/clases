import "dotenv/config"
import express from 'express';
import apiRoutes from './routes/apiRoutes.ts';
import cors from "cors";
import './cron/dailyTask.ts'

const PORT = process.env.PORT || 3002
const app = express();

app.use(cors())
app.use(express.json())

app.use('/api', apiRoutes);

app.listen(PORT, () => { console.log(`servidor iniciado en el puerto ${PORT}`) })