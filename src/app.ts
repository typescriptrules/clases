import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import apiRoutes from "./routes/apiRoutes";
import userRoutes from "./routes/userRoutes";
import { initCronJobs } from "./utils/cronJob";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api", apiRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Iniciar cronjobs
initCronJobs();
