// Aqui defino la ruta de mi API
import { Router } from 'express';
import { getFactController } from '../controllers/fact.controller.ts';

const factRouter = Router();

factRouter.get('/facts', getFactController);

export default factRouter;



