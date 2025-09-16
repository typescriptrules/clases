import { type Request, type Response } from 'express';
import { handleHttp } from '../utils/error.handler.ts'
import { type HttpErrorStatus } from '../types/types.ts'
import { getUsers as getUsersService, getUserById, addUser, deleteUser} from '../services/user.service.ts';

export const getUsers = (req: Request, res: Response) => {  
    try {
        getUsersService().then(users => {
            res.status(200).json(users);
        }).catch(err => {
            handleHttp(res, 'Error getting users', 500, err);
        });
    }catch(err){
        handleHttp(res, 'Error getting users', 500, err);
    }
}

export const getUser = (req: Request, res: Response) => {  
    const statusCode: HttpErrorStatus = 500
    try {
        const { id } = req.params;
        if (!id) {
            return handleHttp(res, 'User ID is required', 400);
        }
        getUserById(id).then(user => {
            if (!user) {
                return handleHttp(res, 'User not found', 404);
            }
            res.status(200).json(user);
        });
    }catch(err){
        handleHttp(res, "Error getting user", statusCode, err);
    }
}

export const createUser = (req: Request, res: Response) => {  
    try {
        const { name, email, age } = req.body;
        if (!name || !email || !age) {
            return handleHttp(res, 'Missing required fields', 400);
        }
        
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            age
        };
        
        addUser(newUser).then(() => {
            res.status(201).json(newUser);
        });
    }catch(err){
        handleHttp(res, 'Error creating user', 500, err);
    }
}

export const updateUsers = (req: Request, res: Response) => {  
    try {
        const { id } = req.params;
        if (!id) {
            return handleHttp(res, 'User ID is required', 400);
        }
        
        const { name, email, age } = req.body;
        
        getUserById(id).then(user => {
            if (!user) {
                return handleHttp(res, 'User not found', 404);
            }
            
            const updatedUser = {
                ...user,
                name: name || user.name,
                email: email || user.email,
                age: age || user.age
            };
            
            deleteUser(id).then(() => {
                return addUser(updatedUser);
            }).then(() => {
                res.status(200).json(updatedUser);
            });
        });
    }catch(err){
        handleHttp(res, 'Error updating user', 500, err);
    }
}

export const deleteUsers = (req: Request, res: Response) => {  
    const { id } = req.params;
    if (!id) {
        return handleHttp(res, 'User ID is required', 400);
    }
    
    deleteUser(id)
        .then(isDeleted => {
            if (!isDeleted) {
                return handleHttp(res, 'User not found', 404);
            }
            res.status(204).send();
        })
        .catch(err => {
            handleHttp(res, 'Error deleting user', 500, err);
        });
}