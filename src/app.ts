import "dotenv/config";
import express from "express";
import cors from "cors";
import { logger } from "./middlewares/logger.js";
import usersRouter from "./routes/users.js";


const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/users", usersRouter);

app.get("/", (_req, res) => res.send("API users CRUD con middlewares ✅"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
