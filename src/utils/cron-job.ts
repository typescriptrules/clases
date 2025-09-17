import cron from "node-cron";
import axios from "axios";

export const startCron = () => {
    // cada minuto
    cron.schedule("* * * * *", async () => {
        console.log("Ejecutando cron job...");
        try {
            const response = await axios.get("http://localhost:3002/logs");
            console.log("Logs obtenidos:", response.data);
        } catch (error: any) {
            console.error("Error obteniendo logs:", error.message);
        }
    });
};