import nodemailer from 'nodemailer';
import { logger } from '../utils/logger.ts';

export async function sendWeatherEmail(summary: string) {
    try {
    // configuracion del transportador
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS
        }
    });

    // opciones del correo
    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: process.env.REPORT_TO,
        subject: "Daily weather summary",
        tex: summary
    };

    // envío
        const info = await transporter.sendMail(mailOptions);
        logger.info(`Mail sent: ${info.response}`);
    } catch(err) {
        logger.error(`Error sending mail", ${(err as Error).message}`);
    }
}