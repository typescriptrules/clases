import { type Request, type Response, type NextFunction } from "express";
import { getusersService } from "../services/user.services.ts"; 
import { type IUser } from "../interfaces/user.interface.ts";


export const validateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = req.body as IUser;

    
    if (!newUser || !newUser.id || !newUser.name || !newUser.email) {
      return res.status(400).json({
        error: "Faltan datos obligatorios: id, name, email",
      });
    }

    
    const users = await getusersService();
    const emailExists = users.some(user => user.email === newUser.email);

    if (emailExists) {
      return res.status(400).json({
        error: "El email ya está registrado. Debe ser único.",
      });
    }

    next(); 
  } catch (error: any) {
    console.error("[MIDDLEWARE] Error en validación:", error.message);
    return res.status(500).json({
      error: "Error interno al validar datos de usuario.",
    });
  }
};
