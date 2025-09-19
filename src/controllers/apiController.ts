import { type Request, type Response } from 'express';
import { getRandomTrivia } from '../services/apiService.ts';

export async function getTriviaController(req: Request, res: Response) {
  try {
    const user = (req as any).user;
    const numberRequested = (req as any).numberRequested;

    // Obtener trivia del número solicitado
    const fact = await getRandomTrivia(String(numberRequested));

    res.json({
      success: true,
      user,
      number: numberRequested,
      fact,
    })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}