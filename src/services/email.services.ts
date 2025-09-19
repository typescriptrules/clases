import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

const sendEmail = async (subject: string, text: string) => {
  try {
    const info = await transporter.sendMail({
      from: `"Servidor Node " <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject, 
      text,
    });
    console.log(" [EMAIL] Correo enviado con éxito:", info.messageId);
  } catch (error: any) {
    console.error("[EMAIL] Error al enviar correo:", error.message);
    throw new Error("No se pudo enviar el correo electrónico.");
  }
};


export { sendEmail };
