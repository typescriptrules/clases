import { Router } from 'express';
import { getTriviaController } from '../controllers/apiController.ts';
import { userMiddleware } from '../middleware/userMiddleware.ts';

const router = Router();

router.get('/:num', userMiddleware, getTriviaController);

export default router;