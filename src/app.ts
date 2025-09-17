import "dotenv/config"
import express from 'express'
import cors from 'cors'
import { router, initRoutes } from './routes/index.ts'

const PORT = process.env.PORT || 3001

const app = express()

const whitelist = ['http://localhost:5000', 'http://127.0.0.1:5500'];
const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.get('/products/:id', cors(corsOptions), (req, res) => {
  res.json({ msg: 'This is CORS-enabled for a whitelisted domain' });
});

app.listen(80, () => {
  console.log('CORS-enabled web server listening on port 80');
});

app.use(cors(corsOptions))
app.use(express.json())

await initRoutes()
app.use(router)

app.listen(PORT, () => {
    console.log("Servidor corriendo en 3001")
})