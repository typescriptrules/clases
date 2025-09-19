import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import cron from "node-cron";
import dotenv from "dotenv";
import  pokemonRouter  from "./src/routes/apiService.ts";
import { sendSummaryEmail } from "./src/services/emailService.ts";

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Endpoint básico
app.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});

app.get("/", (req: Request, res: Response) => {
  res.send("Servidor Express con TypeScript funcionando 🚀");
});

// ruta PokeAPI
app.use("/pokemon", pokemonRouter);

// Tarea cada día a las 9 AM
cron.schedule('0 9 * * *', () => {
  console.log('Ejecutando tarea programada:', new Date());
});

// Tarea cada día a las 8 AM
cron.schedule('0 8 * * *', async () => {

  const summary = "Este es el resumen diario de Pokémon."; 

  try {
    await sendSummaryEmail(summary);
    console.log("Correo de resumen enviado:", new Date());
  } catch (error) {
    console.error("Error enviando el correo:", error);
  }
});

app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});