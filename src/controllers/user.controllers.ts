import { Router, type Request, type Response } from "express";
import { getUserService, getUserIdService, postUserService, deleteUserService, updateUserService } from "../services/user.services.ts";
import type { IUser } from "../interfaces/user.interface.ts";
import { handleHttp } from "../utils/error.handler.ts";
import { type HttpErrorStatus } from "../types/types.ts";

export const getUserController = async(req:Request, res:Response) => {
    try {
        console.log(req.query);
        const data = await getUserService();
        res.json(data)
    } catch (error) {
        handleHttp(res, 'Error fetching user', 500 as HttpErrorStatus, error)
    }
}

export const getUserIdController = async(req:Request, res:Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }
        const data = await getUserIdService(id);
        res.json(data)
    } catch (error) {
        handleHttp(res, 'Error fetching user', 500 as HttpErrorStatus, error)
    }
}

export const postUserController = async (req:Request, res: Response) => {
    try {
        const { id, name, age, ocupation } = req.body
        const data = await postUserService({id, name, age, ocupation})
        res.json(data)
    } catch (error) {
        handleHttp(res, 'Error create user', 500 as HttpErrorStatus, error)
    }
}

export const deleteUserContoller = async( req: Request, res: Response) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }
        const data = await deleteUserService(id)
        res.json(data)
    } catch (error) {
        handleHttp(res, 'Error deleting user', 500 as HttpErrorStatus, error)
    }
}

export const updateUserController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string }

        const updatedUser = await updateUserService(id, req.body)

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found...' })
        }

        res.json(updatedUser)
    } catch (error) {
        handleHttp(res, 'Error updating book', 500 as HttpErrorStatus, error)
    }
}


