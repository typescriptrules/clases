// src/middlewares/userMiddleware.ts
import { type Request, type Response, type NextFunction } from 'express';
import { getUsers } from '../utils/getUsersUtils.ts';
import { type User } from '../types/Users.ts';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, "../models/users.json");

export async function userMiddleware(req: Request, res: Response, next: NextFunction) {
  try {

    const users = await getUsers();

    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'No hay usuarios registrados' });
    }

    const defaultUser:User = users[0]!;
    
    const numParam = req.params.num;

    const regex = /^\d+$/;
    let onlyNumbers:boolean = false;
    numParam? onlyNumbers = regex.test(numParam!) : ''

    if(!onlyNumbers && numParam) {
      return res.status(400).json({ success: false, message: 'Número inválido.' });
    }
    
    if (numParam && defaultUser.numbers.includes(numParam)) {
      return res.status(409).json({ success: false, message: `El número ${numParam} ya fue enviado a este usuario.` });
    }

    if(numParam){
        defaultUser.numbers.push(numParam);
        await fs.writeFile(filePath, JSON.stringify(users, null, 2));
    }

    (req as any).user = defaultUser;
    (req as any).numberRequested = numParam || "random";
    next();

  } catch (error) {
    console.error('Error en userMiddleware:', error);
    res.status(500).json({ success: false, message: 'Error interno en middleware' });
  }
}
