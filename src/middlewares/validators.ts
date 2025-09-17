import type { NextFunction, Request, Response } from "express";
import { promises as fs } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, "../models/users.json");

export async function validateUniqueUserId(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.body;
    if (id == null) {
      return res.status(400).json({ error: "Field 'id' is required" });
    }
    if (typeof id !== "string") {
      return res.status(400).json({ error: "Field 'id' must be a string" });
    }
    const data = await fs.readFile(filePath, "utf-8");
    const users: Array<{ id: string }> = JSON.parse(data);
    const exists = users.some(u => String(u.id) === String(id));
    if (exists) {
      return res.status(400).json({ error: `User with id '${id}' already exists` });
    }
    next();
  } catch (err) {
    next(err);
  }
}

export function validateUserData(req: Request, res: Response, next: NextFunction) {
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  console.log("Body type:", typeof req.body);
  
  // Verificar que req.body existe
  if (!req.body) {
    return res.status(400).json({
      error: "Request body is missing. Make sure to send JSON data with Content-Type: application/json",
    });
  }

  const { name, role } = req.body;

  // Verificar que todos los campos necesarios están presentes
  if (name === undefined || role === undefined) {
    return res.status(400).json({
      error: "Missing required fields: 'id', 'name' and 'role' are required",
      received: { name, role }
    });
  }
  
  if (typeof name !== "string" || typeof role !== "string") {
    return res.status(400).json({
      error: "Invalid data: 'name' and 'role' must be strings",
      received: { name: typeof name, role: typeof role }
    });
  }
  
  // Si pasa la validación, continuar
  next();
}

export function checkPermissions(req: Request, res: Response, next: NextFunction) {
  const { role } = req.body;

  if (role !== "admin") {
    return res.status(403).json({
      error: "Forbidden: only admin users can create new users",
    });
  }
  console.log("Pásale nomás wey")

  // Si tiene permisos, continuar
  next();
}


