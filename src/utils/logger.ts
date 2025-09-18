import { createLogger, format, transports } from 'winston';

const logger = createLogger({
    level: "info",
    format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.printf(({ level, message, timestamp }) => {
            return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        })
    ),
    transports: [
        new transports.Console(), // muestra logs en consola
        new transports.File({ filename: "logs/app.log"}) // guarda logs en archivo
    ],
});

export default logger