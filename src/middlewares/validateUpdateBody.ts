import { type Request, type Response, type NextFunction } from "express";
import { handleHttp } from "../utils/error.handler.ts";
import { type HttpErrorStatus } from "../types/types.ts";
import type { IUsers } from "../interfaces/users.interface.ts";

export const validateUpdateBody = (req: Request, res: Response, next: NextFunction) => {
    let statusCode: HttpErrorStatus = 400;
    const updateData = req.body as Partial<IUsers>;

    if (!updateData || Object.keys(updateData).length === 0) {
        return handleHttp(res, "NO_DATA_TO_UPDATE", statusCode);
    }

    next();
};