import transporter from '../config/nodemailer.config.ts';

const sendEmail = async (to: string, subject: string, html: string) => {
  await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, html });
};

export { sendEmail }
