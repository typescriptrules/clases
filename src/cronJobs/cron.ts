import cron from "node-cron";
import { fetchCryptoData } from "../services/api.axios.ts";
import { sendEmail } from "../services/email.services.ts";

cron.schedule("0 8 * * *", async () => {
  console.log("Ejecutando tarea programada: envío de correo");

  try {
    const data = await fetchCryptoData();

    const message = `
    📊 Resumen Diario de Criptomonedas
    ----------------------------
    Fecha: ${data.time}
    Moneda: ${data.currency}
    Precio: ${data.rate}
    `;

  await sendEmail("Resumen Diario - Criptomonedas", message);
    console.log("[CRON] Tarea finalizada correctamente.");
  } catch (error: any) {
    console.error(" [CRON] Error en la tarea programada:", error.message);
    }
});
