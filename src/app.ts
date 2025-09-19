import 'dotenv/config'
import express, {type Request, type Response} from 'express';
import cors from 'cors';
import {router, initRoutes} from "./routes/index.ts";
import {logMiddleware} from "./middlewares/log.ts";
import {scheduleEmailJob} from "./services/email.service.ts";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const logsDir = path.join(rootDir, "logs");

if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);

const port = process.env.PORT || 3001;
const app = express();

app.use(cors({
    origin: (origin, callback) =>
        !origin || origin === "http://localhost:5173" ? callback(null, true) :
            callback(new Error("Not allowed by CORS"))
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

await initRoutes();
app.use(router);

app.get("/api/ping", logMiddleware, (req: Request, res: Response) => {
    res.json({msg: "pong", from: "API"});
});

scheduleEmailJob();

app.listen(port, () => {
    console.log(`Server started on port http://localhost:${port}!`);
});