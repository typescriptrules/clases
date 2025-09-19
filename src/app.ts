import "dotenv/config";
import express from "express";
import type { Application } from "express";
import cors from "cors";
import { router, initRoutes } from "./routes/index.ts";
import "./jobs/cronJobs.ts"; // asegúrate de que el cron job se inicie
import logger from "./utils/logger.ts";

const PORT = process.env.PORT || 3000;
const app: Application = express(); // 🔹 aquí el tipado

app.use(cors());
app.use(express.json());

// Middleware de logging de requests
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl} - IP: ${req.ip}`);
  next();
});

// Inicializar rutas dinámicas
initRoutes().then(() => {
  app.use("/", router); // 🔹 montamos rutas una sola vez
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

export default app;
