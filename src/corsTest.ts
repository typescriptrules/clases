import express, { type Request, type Response } from "express";
import cors from "cors";

const app = express();
const PORT = 4005;

// Middleware para parsear JSON
app.use(express.json());

// Configuración de CORS
app.use(
  cors({
    origin: "*", // 🔒 luego puedes limitar a tu frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// ==== Endpoints de prueba ====

// GET
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "GET funcionando " });
});

// POST
app.post("/", (req: Request, res: Response) => {
  const body = req.body;
  res.json({ message: "POST funcionando ", dataRecibida: body });
});

// PUT
app.put("/", (req: Request, res: Response) => {
  const body = req.body;
  res.json({ message: "PUT funcionando ", dataRecibida: body });
});

// DELETE
app.delete("/", (req: Request, res: Response) => {
  res.json({ message: "DELETE funcionando " });
});

// ==== Iniciar servidor ====
app.listen(PORT, () => {
  console.log(`Servidor CORS test en http://localhost:${PORT}`);
});
