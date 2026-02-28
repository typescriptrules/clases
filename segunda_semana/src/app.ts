import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router, initRoutes } from './routes/index.ts'

dotenv.config();
const PORT = process.env.PORT || 3001

const app = express()

app.use(cors())
app.use(express.json())

await initRoutes()
app.use(router)


app.listen(PORT, () => {
    console.log("");
    console.log("Servidor Express con TypeScript funcionando 🚀");
    console.log(`Servidor en http://localhost:${PORT}`);
});
