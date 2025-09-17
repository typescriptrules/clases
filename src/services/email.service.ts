import fs from "fs";
import path from "path";
import cron from "node-cron";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const logPath = path.join(process.cwd(), "logs", "logs.json");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

async function sendLogsByEmail(): Promise<void> {
    if (!fs.existsSync(logPath)) return;
    const logs = fs.readFileSync(logPath, "utf-8");
    const mailOptions = {
        from: `"API Logs" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO,
        subject: "Resumen de logs de la API",
        text: logs,
        attachments: [
            {
                filename: "logs.json",
                content: logs,
            },
        ],
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log("Logs enviados por correo");
        const archivePath = path.join(process.cwd(), "logs", `logs-${Date.now()}.json`);
        fs.renameSync(logPath, archivePath);
        fs.writeFileSync(logPath, "[]");
    } catch (err: any) {
        console.error("Error enviando correo:", err.message);
    }
}

function scheduleEmailJob(): void {
    cron.schedule("*/5 * * * *", async () => {
        console.log("Ejecutando cronjob para enviar logs...");
        await sendLogsByEmail();
    });
}

export {sendLogsByEmail, scheduleEmailJob};