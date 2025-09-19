import type {Request, Response, NextFunction} from 'express';
import logger from '../utils/logger.ts';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
    logger.info({route: req.path, method: req.method});
    next();
}