import {type Request, type Response} from 'express';
import type {HttpErrorStatus} from "../types/types.ts";
import {handleHttp} from "../utils/error.handler.ts";
import {
    getUsersService,
    getUserByIdService,
    createUserService,
    updateUserService,
    deleteUserService,
} from "../services/users.service.ts";
import type {IUser} from "../interfaces/user.interface.js";

export const getUsers = (req: Request, res: Response) => {
    let statusCode: HttpErrorStatus = 500;
    try {
        getUsersService().then((response) => {
            res.send(response);
        })
    } catch (e) {
        handleHttp(res, "Something crashed your app: ", statusCode, e)
    }
}

export const getUserById = (req: Request, res: Response): void => {
    let statusCode: HttpErrorStatus = 404;
    try {
        const {id} = req.params;
        getUserByIdService(id).then((user) => {
            if (!user) return res.status(404).send({message: "User not found"});
            res.send(user);
        });
    } catch (e) {
        handleHttp(res, "Something crashed your app: ", statusCode, e);
    }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
    let statusCode: HttpErrorStatus = 400;
    try {
        const newUser: Omit<IUser, "id"> = req.body;
        const user = await createUserService(newUser);
        res.status(201).send(user);
    } catch (e) {
        handleHttp(res, "Something crashed your app: ", statusCode, e);
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    let statusCode: HttpErrorStatus = 404;
    try {
        const {id} = req.params;
        const updatedData: Partial<IUser> = req.body;

        const user = await updateUserService(id, updatedData);
        if (!user) {
            res.status(404).send({message: "User not found"});
            return;
        }
        res.send(user);
    } catch (e) {
        handleHttp(res, "Something crashed your app: ", statusCode, e);
    }
};

export const deleteUser = (req: Request, res: Response): void => {
    let statusCode: HttpErrorStatus = 404;
    try {
        const {id} = req.params;
        deleteUserService(id).then((success) => {
            if (!success) return res.status(404).send({message: "User not found"});
            res.send({message: "User deleted successfully"});
        });
    } catch (e) {
        handleHttp(res, "Something crashed your app: ", statusCode, e);
    }
};