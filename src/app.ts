import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { initRoutes, router } from './routes/index.ts';
import { requestLogger } from "./middlewares/validateUser.ts";

const PORT = process.env.PORT || 3001;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3001";
const app = express();

app.use(cors({
  origin: CLIENT_URL,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json());
app.use(requestLogger);

await initRoutes();
app.use(router);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`🌍 Allowed client: ${CLIENT_URL}`);
});
             