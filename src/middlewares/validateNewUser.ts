import { type Request, type Response, type NextFunction } from "express";
import { handleHttp } from "../utils/error.handler.ts";
import { type HttpErrorStatus } from "../types/types.ts";
import type { IUsers } from "../interfaces/users.interface.ts";

export const validateNewUser = (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body as IUsers;

    if (
        !newUser ||
        !newUser.id ||
        !newUser.name ||
        !newUser.role ||
        !newUser.email ||
        !newUser.createdAt ||
        typeof newUser.isActive !== "boolean"
    ) {
        const statusCode: HttpErrorStatus = 400;
        return handleHttp(res, "INVALID_USER_DATA", statusCode);
    }

    next();
};