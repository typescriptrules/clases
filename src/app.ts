import express from 'express'; 
import factRouter from './routes/fact.routes.ts';
import './jobs/fact.jobs.ts'
import dotenv from 'dotenv';

dotenv.config();
const app = express()
app.use(express.json())

const port = process.env.PORT;

app.use ('/cats', factRouter );

app.listen(port, ()=> {
    console.log(`El servidor está corriendo en el puerto http://localhost:${port}`)
})

