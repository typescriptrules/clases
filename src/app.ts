import "dotenv/config";
import express from "express";
import cors from "cors";
import { router, initRoutes } from "./routes/index.ts";
import { responseTimeMiddleware } from "./middlewares/responseTime.middleware.ts"
import cron from "node-cron";
import { getWeatherService } from "./services/externalApi.service.ts";
import { sendEmail } from "./services/email.service.ts";

const PORT = process.env.PORT || 3002;
const app = express();

app.use(cors());
app.use(express.json());
app.use( responseTimeMiddleware );

await initRoutes();
app.use(router);

cron.schedule("*/1 * * * *", async () => {  // cada minuto
  console.log("⏰ Ejecutando cronjob...");
  try {
    await sendEmail("Prueba cronjob", "Este correo es enviado cada minuto.");
  } catch (error) {
    console.error("❌ Error cronjob:", error);
  }
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})