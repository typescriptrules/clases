import nodemailer from "nodemailer";
import logger from "../utils/logger.ts";

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    let transporter;

    if (process.env.NODE_ENV === "development") {
      // En desarrollo: Ethereal (no manda correos reales, da un link para verlos)
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      logger.info(`Using Ethereal test account: ${testAccount.user}`);
    } else {
      // En producción: Gmail con App Password
      transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    }

    const info = await transporter.sendMail({
      from: `"Books CronJob" <${process.env.EMAIL_USER || "test@example.com"}>`,
      to,
      subject,
      text,
    });

    logger.info(`Email sent to ${to} - Subject: ${subject}`);
    if (nodemailer.getTestMessageUrl(info)) {
      logger.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    }

    return info;
  } catch (error: any) {
    logger.error(`Error sending email: ${error.message}`);
    throw error;
  }
};
