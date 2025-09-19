import { createLogger, transports, format } from "winston";
import path from "path";

export const logger = createLogger({
    level: "info",
    format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.printf(({ level, message, timestamp }) => `[${timestamp}] ${level}: ${message}`)
    ),
    transports: [
        new transports.Console(), // imprime en consola
        new transports.File({ filename: path.join("logs", "app.log")}) // guarda en archivo
    ]
})