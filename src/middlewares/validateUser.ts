import { Request, Response, NextFunction } from "express";

export function validateUser(req: Request, res: Response, next: NextFunction) {
  const { name, email } = req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "El nombre es requerido y debe ser string" });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Email inválido" });
  }

  next();
}
