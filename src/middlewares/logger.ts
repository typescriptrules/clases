import {saveLog} from "../utils/logStorage.ts";
import { type Request, type Response, type NextFunction } from "express"

export const logger = (req: Request, res: Response, next: NextFunction) => {
    const log = `[${new Date().toISOString()}] ${req.method} ${req.url}`
    saveLog(log) // lo manda al archivo
    console.log(log) // lo imprime en consola
    next()
}
