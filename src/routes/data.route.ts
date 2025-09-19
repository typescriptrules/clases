import {Router, type Request, type Response} from 'express';
import {getWeatherByCity} from '../services/weather.service.ts';

const router = Router();

router.get('/api/data', async (req: Request, res: Response) => {
    try {
        const weather = await getWeatherByCity('Medellin');
        return res.json({success: true, data: weather});
    } catch (err: any) {
        return res.status(500).json({success: false, message: err.message || 'Error fetching weather'});
    }
});

export default router;