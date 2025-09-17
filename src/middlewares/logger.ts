import { saveLog } from "../utils/logStorage.ts";
import { type Request, type Response, type NextFunction } from "express";

interface RequestLog {
    timestamp: string;
    method: string;
    url: string;
    ip: string;
    userAgent: string;
    statusCode?: number;
    responseTime?: number;
}

export const logger = (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();
    
    // Crear objeto de log inicial
    const log: RequestLog = {
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url,
        ip: req.ip || req.connection.remoteAddress || 'unknown',
        userAgent: req.get('User-Agent') || 'unknown'
    };
    
    // Interceptar el método end para capturar status code y tiempo
    const originalEnd = res.end;
    res.end = function(chunk?: any, encoding?: any) {
        const responseTime = Date.now() - startTime;
        
        // Completar el log
        log.statusCode = res.statusCode;
        log.responseTime = responseTime;
        
        // Guardar log completo
        saveLog(JSON.stringify(log));
        
        // También mostrar en consola
        console.log(`[${log.timestamp}] ${log.method} ${log.url} - ${log.statusCode} (${log.responseTime}ms)`);
        
        // Llamar al método end original
        originalEnd.call(this, chunk, encoding);
    };
    
    next();
};