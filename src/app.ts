import "dotenv/config";
import express from "express";
import cors from "cors";
import { router, initRoutes } from "./routes/index.ts";
import { responseTimeMiddleware } from "./middlewares/responseTime.middleware.ts"

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use( responseTimeMiddleware );

await initRoutes();
app.use(router);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})