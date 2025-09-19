import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import dataRoute from './routes/data.route.ts';
import {requestLogger} from './middlewares/logger.middleware.ts';
import {startCronJobs} from './cron/schedule.ts';

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