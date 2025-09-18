import { type Request, type Response, type NextFunction } from 'express';

export const validateBookMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { id, author, name, ouwner } = req.body;

    if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: 'El campo "id" es obligatorio y debe ser un string' });
    }

    if (!author || typeof author !== 'string') {
        return res.status(400).json({ message: 'El campo "author" es obligatorio y debe ser un string' });
    }

    if (!name || typeof name !== 'string') {
        return res.status(400).json({ message: 'El campo "name" es obligatorio y debe ser un string' });
    }

    if (!ouwner || typeof ouwner !== 'string') {
        return res.status(400).json({ message: 'El campo "ouwner" es obligatorio y debe ser un string' });
    }

    next();
};
