import { transporter } from "../config/email";

interface MailContent {
  text?: string; // Versión en texto plano (opcional, pero recomendado como fallback)
  html: string;  // Versión en HTML
}

export async function sendEmail(to: string, subject: string, content: MailContent) {
  try {
    console.log(`Intentando enviar email a: ${to}`);
    console.log(`Desde: ${process.env.MAIL_USER}`);
    
    const result = await transporter.sendMail({
      from: `"API Services" <${process.env.MAIL_USER}>`, // Nombre del remitente para un look más profesional
      to,
      subject,
      text: content.text, // Cuerpo en texto plano
      html: content.html, // Cuerpo en HTML
    });
    
    console.log(`Email enviado exitosamente a ${to}`);
    console.log(`Message ID: ${result.messageId}`);
    return { success: true, messageId: result.messageId };
  } catch (err: any) {
    console.error("Error enviando email:", err);
    console.error("Detalles del error:", {
      code: err.code,
      command: err.command,
      response: err.response,
      message: err.message
    });
    throw err; // Propagar el error para que se maneje en el controlador
  }
}
