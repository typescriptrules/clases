import 'dotenv/config';
import nodemailer from "nodemailer";
import { readLogs } from "./logger.ts"; // recuerda la extensión .js si usas "nodenext"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function sendEmailLogs() {
  const logs = readLogs();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: "📊 Reporte de Logs - CronJob",
    text: logs
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("📩 Correo enviado:", info.response);
  } catch (error) {
    console.error("❌ Error enviando correo:", error);
  }
}