import type { NextFunction, Request, Response } from "express";
import type { NetConnectOpts } from "net";

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} Status Code: ${res.statusCode} Duration: ${duration}ms`);
  });

  next();
}

const requests: Record<string, { count: number; lastRequest: number }> = {};
const WINDOW = 60000 // 1 minuto
const LIMIT = 3 // maximo de peticiones por minuto

export function rateLimiter(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip || "unknown";
    const currentTime = Date.now();

    if(!requests[ip]) {
        requests[ip] = { count: 1, lastRequest: currentTime }
    } else {
        if (currentTime - requests[ip].lastRequest < WINDOW) {
            requests[ip].count++;
        } else {
            requests[ip] = { count: 1, lastRequest: currentTime };
        }
    }

    if (requests[ip].count > LIMIT) {
        return res.status(429).json({ ok: false, error: `El límite de solicitudes por minuto establecido es de: ${LIMIT}, espera y vuelve a intentarlo`});
    }

    next();
}