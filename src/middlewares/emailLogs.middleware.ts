import { type Request, type Response, type NextFunction } from "express";
import { sendEmailLogs } from "../utils/mailer.ts";

export async function emailLogsMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    await sendEmailLogs();
    console.log("📩 Correo enviado desde middleware");
  } catch (error) {
    console.error("❌ Error enviando correo desde middleware:", error);
  }
  next();
}
