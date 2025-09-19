import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import logger from '../utils/logger.ts';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export async function sendWeatherEmail(to: string, subject: string, htmlBody: string, meta: any) {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html: htmlBody
        });

        logger.info({
            event: 'email_sent',
            to,
            subject,
            meta
        });

        return info;
    } catch (err: any) {
        logger.error({event: 'email_error', error: err?.message || err});
        throw err;
    }
}