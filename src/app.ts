import 'dotenv/config'
import  express from 'express';
import  cors from 'cors';
import { router, initRoutes } from "./routes/index.ts";

const port = process.env.PORT || 3001;
const app = express ();

app.use(cors());
app.use(express.json());

await initRoutes();
app.use("/", router);

app.listen(port, () => {
    console.log(`Server started on port http://localhost:${port}!`);
})

