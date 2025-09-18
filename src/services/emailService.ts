import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// configuración del transporte
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
});


// Función para enviar correo
export async function sendReportEmail(logContent: string){
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.REPORT_TO,
            subject: 'Reporte de Logs - Cliente Node.js',
            text: logContent,
        });

        console.log('Correo enviado:', info.messageId);
    } catch(err: any) {
        console.error('Error enviando correo:', err.message);
    }
}