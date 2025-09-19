import { Request, Response } from "express";
import { getCryptoPrices } from "../services/apiServices";
import { sendEmail } from "../services/emailService";

export async function getData(req: Request, res: Response) {
  try {
    const data = await getCryptoPrices();
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function testEmail(req: Request, res: Response) {
  try {
    const recipientEmail = process.env.TEST_EMAIL_RECIPIENT || "66quiro@gmail.com";

    if (!recipientEmail) {
      return res.status(400).json({ success: false, error: "No se ha configurado un email de destino en TEST_EMAIL_RECIPIENT." });
    }

    const testMessageText = `¡Hola! Este es un email de prueba desde tu API de servicios.

Fecha y hora: ${new Date().toLocaleString()}
Servidor: API Services
Estado: ✅ Funcionando correctamente

¡Tu aplicación está funcionando perfectamente! 🚀`;

    const testMessageHtml = `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h1 style="color: #4CAF50;">¡Hola! 👋</h1>
        <p>Este es un email de prueba con <strong>formato HTML</strong> desde tu API de servicios.</p>
        <div style="border-left: 4px solid #4CAF50; padding-left: 15px; margin: 20px 0; background-color: #f9f9f9;">
          <p><strong>Fecha y hora:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Servidor:</strong> API Services</p>
          <p><strong>Estado:</strong> <span style="color: green; font-weight: bold;">✅ Funcionando correctamente</span></p>
        </div>
        <p>¡Tu aplicación está funcionando perfectamente! 🚀</p>
        <hr>
        <p style="font-size: 0.9em; color: #777;">Este es un mensaje automático. Por favor, no respondas a este correo.</p>
      </div>
    `;

    await sendEmail(
      recipientEmail,
      "Test Email - API Services",
      { text: testMessageText, html: testMessageHtml }
    );

    res.json({ 
      success: true, 
      message: "Email de prueba enviado correctamente",
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    res.status(500).json({ 
      success: false, 
      error: err.message,
      note: "Asegúrate de configurar las variables MAIL_USER y MAIL_PASS en el archivo .env"
    });
  }
}
