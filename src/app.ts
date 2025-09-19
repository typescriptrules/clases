import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import dataRoute from './routes/data.route.ts';
import {requestLogger} from './middlewares/logger.middleware.ts';
import {startCronJobs} from './cron/schedule.ts';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const logsDir = path.join(rootDir, "logs");

if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);

const app = express();

app.use(cors({
    origin: (origin, callback) =>
        !origin || origin === "http://localhost:5173" ? callback(null, true) :
            callback(new Error("Not allowed by CORS"))
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(requestLogger);
app.use(dataRoute);

startCronJobs();

app.listen(process.env.PORT, () => {
    console.log(`Server started on port http://localhost:${process.env.PORT}!`);
});