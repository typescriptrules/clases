import { type Request, type Response } from "express";
import { getFactService } from "../services/fact.services.js";

const getFactController = async (req: Request, res: Response) => {
    try {
        const fact = await getFactService()
        res.json({ fact })
    } catch (error) {
        console.error('Error al obtener datos:', error);
        res.status(500).send('Error al obtener datos');
    }
}

export { getFactController }
