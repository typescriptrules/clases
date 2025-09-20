import { type Request, type Response, type NextFunction } from 'express';

export const responseTimeMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        
        console.log(`Method ${req.method} in ${req.originalUrl} - ${duration}ms ⏱️`);
    });

    next();
};
