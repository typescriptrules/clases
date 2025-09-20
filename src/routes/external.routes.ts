import { Router } from "express";
import { getWeatherService } from "../services/externalApi.service.ts";

const router: Router = Router();

router.get("/", async (req, res) => {
  try {
    const weather = await getWeatherService();
    res.json({ ok: true, weather });
  } catch (error) {
    res.status(500).json({ ok: false, error: "Error fetching external API" });
  }
});

export { router };
