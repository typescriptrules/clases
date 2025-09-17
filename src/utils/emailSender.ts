import nodemailer from 'nodemailer';
import { readdirSync, readFileSync } from 'fs';
import path from 'path';
import "dotenv/config";

export async function sendMonthlyEmail() {
    const logDir = './src/logs';
    const files = readdirSync(logDir);
    const attachments = files.map(file => {
        return {
            filename: file,
            content: readFileSync(path.join(logDir, file)),
        };
    });


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER, // Cambia esto
            pass: process.env.PASS // O mejor usa variables de entorno
        }
    });


    await transporter.sendMail({
        from: process.env.USER,
        to: 'destinatario@example.com',
        subject: 'Logs del Mes - API',
        text: 'Adjunto los logs generados por las peticiones a la API.',
        attachments
    });


    console.log('📧 Correo enviado con los logs del mes.');
}
