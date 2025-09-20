import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS  
  }
});

export async function sendEmail(subject: string, text: string) {
  try {
    const info = await transporter.sendMail({
      from: `"API Notifier" <${process.env.EMAIL_USER}>`,
      to: ["jce00264@gmail.com",
        "monicapatri16@hotmail.com.com"
      ], 
      subject,
      text
    });

    console.log("Email enviado correctamente");
    console.log("Message ID:", info.messageId);
    console.log("Server response:", info.response);
  } catch (error) {
    console.error("Error enviando email:", error);
  }
}
