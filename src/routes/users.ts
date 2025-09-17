import { response, Router, type Request, type Response } from 'express'
import { checkPermissions, validateUserData } from '../middlewares/validateUser.ts';
import { getUsers, getUserById, deleteUserById, createUser, updateUserById } from '../controllers/users.ts'

const router: Router = Router();


// create user 
router.post('/', checkPermissions, validateUserData, createUser);

// get all users
router.get('/', (req: Request, res: Response) => {
    getUsers(req,res)
});

// get user by id
router.get('/:id', (req: Request, res: Response) => {
    getUserById(req,res)
});

// delete user by id 
router.delete('/:id', (req: Request, res: Response) => {
    deleteUserById(req,res)
});

// update user by id
router.put('/:id', (req: Request, res: Response) => {
    updateUserById(req,res)
});


export { router }