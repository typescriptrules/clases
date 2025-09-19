import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Validar que las variables de entorno existan
if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
  throw new Error("Las variables de entorno MAIL_USER y MAIL_PASS son obligatorias.");
}

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Verificar la configuración del transporter
transporter.verify((error, success) => {
  if (error) {
    console.error("Error en configuración de email:", error);
    console.error("Verifica que MAIL_USER y MAIL_PASS estén configurados correctamente");
  } else {
    console.log("Configuración de email verificada correctamente");
    console.log(`Usuario configurado: ${process.env.MAIL_USER}`);
  }
});