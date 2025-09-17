import type { Request, Response, NextFunction } from "express";

const FIXED_TOKEN = process.env.FIXED_TOKEN || "secretonpm";

// Protege rutas: exige `Authorization: Bearer <token>`
export const requireFixedToken = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization || "";
    const [, token] = header.split(" ");
    if (token !== FIXED_TOKEN) {
        return res.status(401).json({ message: "Token inválido o ausente" });
    }
    next();
};

// Ejemplo opcional de “roles” sin login: rol por header
// En Postman:  x-role: admin  (o user)
export const requireRole = (role: "admin" | "user") => {
    return (req: Request, res: Response, next: NextFunction) => {
        const r = String(req.headers["x-role"] || "").toLowerCase();
        if (r !== role) return res.status(403).json({ message: "Rol no autorizado" });
        next();
    };
};
