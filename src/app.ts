import 'dotenv/config'
import  express from 'express';
import  cors from 'cors';
import { router, initRoutes } from "./routes/index.ts";

const port = process.env.PORT || 3001;
const app = express ();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

await initRoutes();
app.use("/", router);

app.listen(port, () => {
    console.log(`Server started on port http://localhost:${port}!`);
})

//use cors for unique origin
//change book to person
//add any kin of middleware