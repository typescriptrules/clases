import type { Request, Response } from "express";
import { Router } from "express";
import { getPokemon } from "../services/apiService.ts";

const router = Router();

// GET /pokemon/:name
router.get("/:name", async (req: Request, res: Response) => {
  try {
    const data = await getPokemon(req, res);
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;