import cron from "node-cron";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { sendEmail } from "../services/email.services.ts";
import logger from "../utils/logger.ts";

// ESM replacements for __dirname and __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ENABLED = process.env.CRON_ENABLED === "true";
const SCHEDULE = process.env.CRON_SCHEDULE || "0 8 * * *"; // cada día a las 8:00 AM
const RECEIVER = process.env.NOTIFY_EMAIL || "mi@correo.com";

const logFile = path.join(__dirname, "../src/logs/app.log");

if (ENABLED) {
  logger.info(`Scheduling cron job: '${SCHEDULE}'`);
  cron.schedule(SCHEDULE, async () => {
    logger.info("Cron job started");
    try {
      if (!fs.existsSync(logFile)) {
        fs.writeFileSync(logFile, ""); 
      }

      const logs = fs.readFileSync(logFile, "utf8") || "No hay logs disponibles";

      await sendEmail(RECEIVER, " Resumen diario de logs", logs);

      logger.info("Cron job finished successfully (logs enviados)");
     } catch (err: unknown) {
  console.error(" Cron job error (raw):", err); // 👈 imprime el error completo
  if (err instanceof Error) {
    logger.error(`Cron job error: ${err.message}`);
  } else {
    logger.error(`Cron job error: ${JSON.stringify(err)}`);
  }console.log(" Cron job error (handled)");
  
  
}

    
  });
} else {
  logger.info("Cron job is disabled. Set CRON_ENABLED=true to enable it.");
}
