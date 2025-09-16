import { type Request, type Response } from "express";
import { handleHttp } from "../utils/error.handler.ts";
import { type HttpErrorStatus } from "../types/types.ts";
import { getUserService, getUsersService, createUserService, deleteUserService, updateUserService } from "../services/user.services.ts";
import type { IUser } from "../interfaces/user.interface.ts";

const getUser = (req: Request<{ id: string }>, res: Response) => {  
    const statusCode: HttpErrorStatus = 500;
    const { id } = req.params;
    try {
        getUserService(id).then((response) => {
            if (!response) {
                res.status(404).send({ message: "User not found" });
            } else {
                res.send(response);
            }
        })
    }catch(err){
        handleHttp(res, "ERROR_GET_USER", statusCode, err);
    }
};

const getUsers = (req:Request, res:Response):void => {
    let statusCode:HttpErrorStatus = 500;
    try {
        getUsersService().then((response) => {
            res.send(response);
        })
    } catch (err) {
        handleHttp(res, 'ERROR_GET_BOOKS', statusCode, err);
    }

};

const createUser = (req: Request, res: Response): void => {
    let statusCode:HttpErrorStatus = 500;
    try {
        const user = req.body;
        createUserService(user).then((response) => {
        res.send(response);
        });
    } catch(err){
        handleHttp(res, "ERROR_POST_USER", statusCode, err);
    }
};

const deleteUser = (req: Request<{ id: string }>, res: Response) => {  
    let statusCode:HttpErrorStatus = 500;
    const { id } = req.params;
    try {
        deleteUserService(id).then((response) => {
            res.send(response);
        })

    }catch(err){
        handleHttp(res, "ERROR_DELETE_USER", statusCode, err);
    }
};

const updateUser = (req: Request<{ id: string }>, res: Response) => {  
    let statusCode:HttpErrorStatus = 500;
    const { id } = req.params;
    const user:IUser = req.body;
    try {
        updateUserService(id, user).then((response) => {
            if (!response) {
                res.status(404).send({ message: "User not found" });
            } else {
                res.send(response);
            }
        })
    }catch(err){
        handleHttp(res, "ERROR_PUT_USER", statusCode, err);
    }
};

export { getUser, getUsers, createUser, deleteUser, updateUser};