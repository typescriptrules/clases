import type { Request, Response } from 'express'
import { handleHttp } from '../utils/error.handler.ts'
import type { HttpErrorStatus } from '../types/types.ts'
import { getUsersService, getUserByIdService, createUserService, deleteUserByIdService, updateUserByIdService } from '../services/users.service.ts'



// get all users
const getUsers = (req:Request, res:Response) => {
    let statusCode:HttpErrorStatus = 500
    try {
        getUsersService().then((response) => {
            res.send(response)
        })
    } catch(err) {
        handleHttp(res, 'Something crashed your app', statusCode, err)
    }
}



// get user by id
const getUserById = async (req: Request, res: Response) => {
    let statusCode:HttpErrorStatus = 500;
    try {
        const id = parseInt(req.params.id, 10);

        if(isNaN(id)){
            statusCode = 400;
            return handleHttp(res, "User ID mus be a number", statusCode);
        }

        const user = await getUserByIdService(id);

        if(!user) {
            statusCode = 404;
            return handleHttp(res, "User not found", statusCode);
        }

        return res.json(user) //ultima respuesta
    } catch(err) {
        return handleHttp(res, "Something crahed your app", statusCode, err);
    }
}




// delete user by id
const deleteUserById = async (req:Request, res:Response) => {
    let statusCode:HttpErrorStatus = 500
    try {
        const id = parseInt(req.params.id, 10);

        if(isNaN(id)){
            statusCode = 400
            return handleHttp(res, "User ID mus be a number", statusCode);
        }

        if (!id){
            statusCode = 400;
            handleHttp(res, 'User ID is required', statusCode)
            return;
        }
        
        const user = await deleteUserByIdService(id);

        if(!user) {
            statusCode = 404;
            return handleHttp(res, "User not found", statusCode);
        }

        return res.json(user)
    } catch(err) {
        return handleHttp(res, 'Something crashed your app', statusCode, err)
    }
}



// create user
const createUser = async (req:Request, res:Response) => {
    let statusCode:HttpErrorStatus = 500
    try{
        const body = req.body ;

        if (
            !body ||
            body.id == null ||
            typeof body.name !== 'string' ||
            typeof body.role !== 'string' ||
            typeof body.email !== 'string' ||
            typeof body.createdAt !== 'string' ||
            typeof body.isActive !== 'boolean'
        ) {
            statusCode = 400;
            return handleHttp(res, 'Invalid user data', statusCode);
    }

        const response = await createUserService(body);

        if(response){
            return res.status(201).json({ message: 'User created successfully', user: response });
        } else {
            statusCode = 400;
            return handleHttp(res, 'User could not be created', statusCode);
        }
    } catch(err) {
        return handleHttp(res, 'Something crashed your app', statusCode, err);
    }
}



// update user by id
const updateUserById = (req:Request, res:Response) => {
    let statusCode:HttpErrorStatus = 500
    try {
        const id = parseInt(req.params.id, 10);
        const body = req.body

        if (
            !body ||
            body.id == null ||
            typeof body.name !== 'string' ||
            typeof body.role !== 'string' ||
            typeof body.email !== 'string' ||
            typeof body.createdAt !== 'string' ||
            typeof body.isActive !== 'boolean'
        ) {
            statusCode = 400;
            return handleHttp(res, 'Invalid user data', statusCode);
        }

        if(!id) {
            statusCode = 400;
            handleHttp(res, 'User ID is required', statusCode)
            return;
        }

        if(!body){
            statusCode = 400;
            handleHttp(res, 'Invalid user data', statusCode)
            return;
        }

        updateUserByIdService(id, body).then((response) => {
            if(response){
                res.send({ message: 'User updated successfully', user: response})
            } else {
                statusCode = 404;
                handleHttp(res, 'User not found', statusCode)
            }
        })
    } catch(err) {
        handleHttp(res, 'Somethin crashed your app', statusCode, err);
    }
}

export { getUsers, getUserById, deleteUserById, createUser, updateUserById }