import {type Request, type Response, type NextFunction} from "express";
import fs from "fs";
import path from "path";

interface LogEntry {
    timestamp: string;
    ip: string;
    method: string;
    url: string;
    headers: Record<string, any>;
}

const logPath = path.join(process.cwd(), "logs", "logs.json");

export function saveLog(logEntry: any) {
    try {
        let logs: any[] = [];
        if (fs.existsSync(logPath)) {
            const content = fs.readFileSync(logPath, "utf-8");
            if (content.trim()) {
                logs = JSON.parse(content);
            }
        }
        logs.push(logEntry);
        fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));
    } catch (error) {
        console.error("Error saving log:", error);
    }
}

export function logMiddleware(req: Request, res: Response, next: NextFunction) {
    const log: LogEntry = {
        timestamp: new Date().toISOString(),
        ip: req.ip!,
        method: req.method,
        url: req.originalUrl,
        headers: req.headers,
    };
    saveLog(log);
    next();
}