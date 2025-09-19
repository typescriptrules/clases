import { Router, type Request, type Response } from 'express';
import { getMedellinWeather, getBogotaWeather, getAllWeathers } from '../services/api.service.ts';;

const router: Router = Router();


// GET /weather: obtiene todos los climas, todo lo que mostramos de la API (lo mismo que el endpoint /api/data)
router.get('/', async (req: Request, res: Response) => {
    const weathers = await getAllWeathers();
    res.json(weathers);
});

// GET /weather/medellin
router.get('/medellin', async(req: Request, res: Response) => {
    const medellin = await getMedellinWeather();
    res.json(medellin);
})

// GET /weather/bogota
router.get('/bogota', async(req: Request, res: Response) => {
    const bogota = await getBogotaWeather();
    res.json(bogota);
})

export default router;