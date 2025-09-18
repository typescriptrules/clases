import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import {router, initRoutes} from "./routes/index.ts";
import {logMiddleware} from "./middlewares/log.ts";
import {scheduleEmailJob} from "./services/email.service.ts";

const app = express();

app.use(cors({
    origin: (origin, callback) =>
        !origin || origin === "http://localhost:5173" ? callback(null, true) :
            callback(new Error("Not allowed by CORS"))
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logMiddleware);

await initRoutes();
app.use(router);

scheduleEmailJob();

app.listen(process.env.PORT, () => {
    console.log(`Server started on port http://localhost:${process.env.PORT}!`);
});