import cron from "node-cron"
import { promises as fs } from "fs"
import { sendEmail } from "./emailService.js"

const logFile = "logs.txt"

cron.schedule("*/1 * * * *", async () => {
    try {
        const logs = await fs.readFile(logFile, "utf8")
        if (logs.trim()) {
            await sendEmail("Reporte de Logs", logs)
            console.log("Logs enviados por correo")
            await fs.writeFile(logFile, "") // limpiar después de enviar
        } else {
            console.log("No hay logs para enviar")
        }
    } catch (err) {
        console.error("Error en cron job:", err)
    }
})
