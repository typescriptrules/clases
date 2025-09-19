import nodemailer from 'nodemailer';
import "dotenv/config"

export async function sendSummaryEmail(htmlContent: string, recipients: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipients,
    subject: 'Trivia numérica del día',
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('📩 Correo enviado:', info.response);
  } catch (error) {
    console.error('❌ Error enviando correo:', error);
  }
}