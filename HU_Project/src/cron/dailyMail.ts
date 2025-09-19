import cron from "node-cron";
import { getAllWeathers } from "../services/api.service.ts";
import { sendWeatherEmail } from "../services/email.service.ts";
import { logger } from "../utils/logger.ts";

export function startDailyJob() {
  // todos los días a las 11:00 AM hora Bogotá
  cron.schedule(
    "34 11 * * *",
    async () => {
      logger.info("Executing daily report...");

      try {
        const weathers = await getAllWeathers();
        logger.info("Weather data obtained");

        const summary = JSON.stringify(weathers, null, 2);
        await sendWeatherEmail(summary);

        logger.info("Mail sent successfully");
      } catch (err) {
        logger.error(`Error in the daily report: ${(err as Error).message}`);
      }
    },
    {
      timezone: "America/Bogota",
    }
  );
}
