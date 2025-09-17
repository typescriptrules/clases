import "dotenv/config"
import axios from "axios"
import cron from "node-cron"
import nodemailer from "nodemailer"

// Configuración de transporte de correo
const transporter = nodemailer.createTransport({
    service: "gmail", // o smtp si usas otro
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})

// Función para traer logs de la API
const fetchLogs = async () => {
    try {
        const res = await axios.get("http://localhost:3002/logs")
        return res.data
    } catch (err) {
        console.error(" Error obteniendo logs:", err.message)
        return []
    }
}

// Función para enviar logs por correo
const sendEmail = async (logs) => {
    if (!logs || logs.length === 0) {
        console.log(" No hay logs para enviar")
        return
    }

    try {
        await transporter.sendMail({
            from: `"Log Monitor" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO,
            subject: "Reporte de Logs de la API",
            text: `Aquí están los logs:\n\n${logs.join("\n")}`,
        })
        console.log("Correo enviado con logs")
    } catch (err) {
        console.error("Error enviando correo:", err.message)
    }
}

// Cron job: cada minuto
cron.schedule("*/5 * * * *", async () => {
    console.log("Ejecutando cron job...")
    const logs = await fetchLogs()
    await sendEmail(logs)
})
