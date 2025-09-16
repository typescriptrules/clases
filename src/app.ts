import 'dotenv/config'
import  express from 'express';
import  cors from 'cors';
import { router, initRoutes } from "./routes/index.ts";

const port = process.env.PORT || 3001;
const app = express ();

app.use(cors({
  origin: (origin, callback) => {
    // if (!origin) return callback(null, true);
    if (origin === "http://localhost:5173") {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

await initRoutes();
app.use(router);

app.listen(port, () => {
    console.log(`Server started on port http://localhost:${port}!`);
})

//create frontend
//use cors for unique origin
//add any kin of middleware