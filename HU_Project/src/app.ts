import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { router, initRoutes } from './routes/index.ts';
import { startDailyJob } from './cron/dailyMail.ts';
import { logger } from './utils/logger.ts';

const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;
const app = express();

app.use(cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json());

await initRoutes();
app.use(router);

startDailyJob();

app.listen(PORT, () => {
    logger.info(`Server running in http://localhost:${PORT}`);
});
