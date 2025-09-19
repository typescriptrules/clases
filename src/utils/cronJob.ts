import cron from "node-cron";
import { getCryptoPrices } from "../services/apiServices";
import { sendEmail } from "../services/emailService";
import { getUsers } from "../services/userServices";

export function initCronJobs() {
  cron.schedule("*/2 * * * *", async () => {
    console.log("Ejecutando cronjob de reporte de cryptos...");
    try {
      const data = await getCryptoPrices();
      const summaryText = data
        .map((c: any) => `${c.name}: $${c.current_price}`)
        .join("\n");
      
      const summaryHtml = `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
          <h2 style="color: #0056b3; border-bottom: 2px solid #0056b3; padding-bottom: 10px;">Reporte de Criptomonedas</h2>
          <p>Aquí está el resumen de precios de las principales criptomonedas:</p>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #f2f2f2;">
                <th style="padding: 12px; border: 1px solid #ddd; text-align: left;">Criptomoneda</th>
                <th style="padding: 12px; border: 1px solid #ddd; text-align: right;">Precio (USD)</th>
              </tr>
            </thead>
            <tbody>
              ${data.map((c: any) => `
                <tr>
                  <td style="padding: 12px; border: 1px solid #ddd;">${c.name}</td>
                  <td style="padding: 12px; border: 1px solid #ddd; text-align: right;">$${c.current_price.toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <p style="margin-top: 20px; font-size: 0.9em; color: #777;">Hora del reporte: ${new Date().toLocaleString()}</p>
        </div>
      `;
      // Obtener todos los usuarios registrados y enviar el reporte a cada email
      const users = await getUsers();
      const recipients = Array.from(new Set(
        users
          .map(u => u.email)
          .filter((e): e is string => typeof e === 'string' && e.trim().length > 0)
      ));

      if (recipients.length === 0) {
        console.warn("Cronjob: No hay usuarios con email para enviar el reporte.");
        return;
      }

      console.log(`Cronjob: enviando reporte a ${recipients.length} destinatarios.`);

      const results = await Promise.allSettled(
        recipients.map((to) =>
          sendEmail(
            to,
            "Crypto Report - Cada 2 minutos",
            {
              text: `Reporte de precios de criptomonedas:\n\n${summaryText}\n\nHora: ${new Date().toLocaleString()}`,
              html: summaryHtml
            }
          )
        )
      );

      const failed = results.filter(r => r.status === 'rejected');
      if (failed.length > 0) {
        console.error(`Cronjob: ${failed.length} envíos fallaron.`);
      }
    } catch (err) {
      console.error("Error en cronjob:", err);
    }
  });
}
