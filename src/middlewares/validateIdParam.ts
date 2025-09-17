import { type Request, type Response, type NextFunction } from "express";
import { handleHttp } from "../utils/error.handler.ts";
import { type HttpErrorStatus } from "../types/types.ts";

export const validateIdParam = (req: Request, res: Response, next: NextFunction) => {
    let statusCode: HttpErrorStatus = 400;
    const { id } = req.params;
    const numericId = Number(id);

    if (isNaN(numericId)) {
        return handleHttp(res, "INVALID_ID", statusCode);
    }

    (req as any).numericId = numericId;
    next();
};