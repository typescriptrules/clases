import { Router } from "express";
import { fetchCryptoData } from "../services/api.axios.ts";

const router = Router();


router.get("/data", async (req, res) => {
  try {
    const data = await fetchCryptoData();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al obtener datos" });
  }
});

export { router };