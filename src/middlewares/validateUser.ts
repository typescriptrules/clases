import type { Request, Response, NextFunction } from "express";
import type { IUser } from "../interfaces/user.interface.js";

// Validación para crear usuario
export const validateUserCreate = (req: Request, res: Response, next: NextFunction) => {
    const { name, email, role } = req.body as Partial<IUser>;
    if (!name || typeof name !== "string") {
        return res.status(400).json({ message: "name es requerido y debe ser string" });
    }
    if (!email || typeof email !== "string") {
        return res.status(400).json({ message: "email es requerido y debe ser string" });
    }
    if (role && role !== "user" && role !== "admin") {
        return res.status(400).json({ message: "role debe ser 'user' | 'admin'" });
    }
    next();
};

// Validación para actualizar (parcial)
export const validateUserUpdate = (req: Request, res: Response, next: NextFunction) => {
    const { name, email, role } = req.body as Partial<IUser>;
    if (name !== undefined && typeof name !== "string") {
        return res.status(400).json({ message: "name debe ser string" });
    }
    if (email !== undefined && typeof email !== "string") {
        return res.status(400).json({ message: "email debe ser string" });
    }
    if (role !== undefined && role !== "user" && role !== "admin") {
        return res.status(400).json({ message: "role debe ser 'user' | 'admin'" });
    }
    next();
};
