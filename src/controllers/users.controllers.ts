import { Router, type Request, type Response } from "express";
import { getUserService } from "../services/users.services.ts";
import type { IUser } from "../interfaces/use.interface.ts";
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