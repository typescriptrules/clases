import { type Request, type Response, type NextFunction } from 'express';

export const validateUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { id, name, age, ocupation } = req.body;

    if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: 'The "name" field is required and must be a string.' });
    }

    if (!name || typeof name !== 'string') {
        return res.status(400).json({ message: 'The "role" field is required and must be a string.' });
    }

    if (!age || typeof age !== 'number') {
        return res.status(400).json({ message: 'The "age" field is required and must be a number.' });
    }

    if (!ocupation || typeof ocupation !== 'string') {
        return res.status(400).json({ message: 'The "ocupation" field is required and must be a boolean.' });
    }

    next();
};
