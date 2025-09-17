import { response, type Request, type Response } from "express";
import { handleHttp } from "../utils/error.handler.ts";
import { type HttpErrorStatus } from "../types/types.ts";
import { deleteUsersService, getUsersIDservice, getUsersService, postUsersService, putUsersService } from "../services/users.service.ts";
import { request } from "http";
import type { IUsers } from "../interfaces/users.interface.ts";

const getUser = async (req: Request, res:Response):Promise<void> => {
    let statusCode:HttpErrorStatus = 500;
    try {
        const user = await getUsersService();
        res.send(user)
    } catch (error) {
        handleHttp(res,"ERROR_GET_USERS", statusCode, error )
    }
}

const getUserID = async (req: Request, res:Response): Promise<void> => {
    let statusCode:HttpErrorStatus = 500;
    try{
        let {id} = req.params
        const numericId = Number(id);

        const user = await getUsersIDservice(numericId);
        if(!user){
            statusCode = 404;
            return handleHttp(res, 'ERROR_GET_USERS', statusCode);
        }
        res.send(user)

    } catch (error) {
        handleHttp(res,"ERROR_GET_USERS", statusCode, error )
    }
}

const postUsers = async (req: Request, res:Response): Promise<void> => {
    let statusCode: HttpErrorStatus = 500;
    try {
        const newUser = req.body as IUsers;

        const user = await getUsersService();
        const exists = user.some(b => b.id === newUser.id);
        if (exists) {
            statusCode = 400;
            return handleHttp(res, "ID_ALREADY_EXISTS", statusCode);
        }
        const createdUser = await postUsersService(newUser);
        res.status(201).send(createdUser);
    } catch (err) {
        handleHttp(res, 'ERROR_POST_USER', statusCode, err);
    }
};

const putUsersID = async (req: Request, res:Response ):Promise<void> => {
    let statusCode:HttpErrorStatus = 500;
    try {
        const { id } = req.params;
        const numericId = Number(id);

        const updateData = req.body as Partial<IUsers>;

        const books = await putUsersService(numericId,updateData)
        if (!books) {
            statusCode = 404;
            return handleHttp(res, "USER_NOT_FOUND", statusCode);
        }
        res.send(books)
    } catch ( err ){
        handleHttp(res, 'ERROR_GET_USER', statusCode, err);
    }
};

const deleteUsersID = async (req: Request, res:Response ):Promise<void> => {
    let statusCode:HttpErrorStatus = 500;
    try {
        const {id} = req.params;
        const numericId = Number(id);

        const users = await deleteUsersService(numericId)

        if (!users) {
            statusCode = 404;
            return handleHttp(res, 'BOOK_NOT_USER', statusCode);
        }

        res.send(users)
        
    } catch ( err ){
        handleHttp(res, 'ERROR_GET_USER', statusCode, err);
    }
}

export{getUser, getUserID, postUsers, putUsersID, deleteUsersID}