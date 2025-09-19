import type {NextFunction, Request, Response} from "express";

export function randomColorMiddleware(req: Request, res: Response, next: NextFunction) {
    res.locals.randomColor = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
  next();
}