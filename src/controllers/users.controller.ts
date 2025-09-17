import type { Request, Response } from "express";
import {
    getUsersService,
    getUserByIdService,
    createUserService,
    updateUserService,
    deleteUserService
} from "../services/user.service.js";
import type { IUser } from "../interfaces/user.interface.js";

export const listUsers = async (_req: Request, res: Response) => {
    try {
        const users = await getUsersService();
        res.json(users);
    } catch {
        res.status(500).json({ message: "Error al listar usuarios" });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) return res.status(400).json({ message: "ID inválido" });

        const user = await getUserByIdService(id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
        res.json(user);
    } catch {
        res.status(500).json({ message: "Error al obtener usuario" });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, role } = req.body as Omit<IUser, "id">;
        if (!name || !email) {
            return res.status(400).json({ message: "name y email son requeridos" });
        }
        const created = await createUserService({ name, email, role });
        res.status(201).json(created);
    } catch {
        res.status(500).json({ message: "Error al crear usuario" });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) return res.status(400).json({ message: "ID inválido" });

        const updated = await updateUserService(id, req.body as Partial<IUser>);
        if (!updated) return res.status(404).json({ message: "Usuario no encontrado" });
        res.json(updated);
    } catch {
        res.status(500).json({ message: "Error al actualizar usuario" });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) return res.status(400).json({ message: "ID inválido" });

        const ok = await deleteUserService(id);
        if (!ok) return res.status(404).json({ message: "Usuario no encontrado" });
        res.status(200).json({ message: "Usuario eliminado" });
    } catch {
        res.status(500).json({ message: "Error al eliminar usuario" });
    }
};
