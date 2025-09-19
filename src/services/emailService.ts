import nodemailer from "nodemailer";
import "dotenv/config";


export async function sendSummaryEmail(summary: string) {
    console.log("USER:", JSON.stringify(process.env.EMAIL_USER));
    console.log("PASS:", JSON.stringify(process.env.EMAIL_PASS));
    console.log("TO:", JSON.stringify(process.env.EMAIL_TO));


  // Configura tu transportador SMTP
  const transporter = nodemailer.createTransport({
    service: "gmail", // O tu proveedor SMTP
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Configura el correo
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO, // destinatario
    subject: "Resumen diario de Pokémon",
    text: summary,
  };

  // Envía el correo
  await transporter.sendMail(mailOptions);
}