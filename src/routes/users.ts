import { Router, type Request, type Response } from "express";
import { getUser, getUsers, createUser, deleteUser, updateUser } from "../controllers/users.ts";

const router:Router = Router();

router.get('/:id', (req:Request<{ id: string }>, res: Response) => {
    console.log(`Printing user ${req.params.id}`);
    getUser(req, res);
});

router.get('/', (req:Request, res:Response) => {
    console.log('Printing users');
    getUsers(req, res);
});

router.post('/', (req: Request, res: Response) => {
  console.log('Creating user');
  createUser(req, res);
});

router.delete('/:id', (req: Request<{ id: string }>, res: Response) => {
  console.log(`Deleting user ${req.params.id}`);
  deleteUser(req, res);
});

router.put('/:id', (req: Request<{ id: string }>, res: Response) => {
  console.log(`Updating user ${req.params.id}`);
  updateUser(req, res);
});

export { router };