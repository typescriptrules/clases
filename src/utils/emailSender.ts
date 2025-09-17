// src/utils/emailSender.ts
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fs from 'fs';

// 🔧 Emular __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.resolve(__dirname, '../../.env'), // ← ¡esta ruta es la correcta!
});


export async function sendMonthlyEmail() {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Buscar archivos en logs
    const logsPath = path.resolve(__dirname, '../logs');
    const files = fs.readdirSync(logsPath);

    const attachments = files.map((file) => ({
        filename: file,
        path: path.join(logsPath, file),
    }));

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO,
        subject: '📦 Logs del Mes - API',
        text: 'Adjunto los logs generados por las peticiones a la API.',
        attachments
    });

    console.log('✅ Correo enviado con logs del mes.');
}
