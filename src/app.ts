import "dotenv/config"
import express from "express"
import cors from "cors"
import "./cronJobs/cron.ts";
import { router, initRoutes } from "./routes/index.ts"

const PORT = process.env.PORT;
const app = express();


app.use(cors())
app.use(express.json())

await initRoutes()
app.use(router)

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

