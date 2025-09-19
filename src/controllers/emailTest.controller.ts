import { type Request, type Response } from "express";
import { sendEmail } from "../services/email.services.ts";
import nodemailer from "nodemailer";

export const sendTestEmail = async (req: Request, res: Response) => {
  try {
    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
      return res.status(400).json({ error: "Faltan parámetros: to, subject, text" });
    }

    const info = await sendEmail(to, subject, text);

    return res.json({
      ok: true,
      messageId: info.messageId,
      accepted: info.accepted,
      response: info.response,
      // solo habrá URL de preview si es Ethereal
      preview: nodemailer.getTestMessageUrl(info) || null,
    });
  } catch (err: any) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};
