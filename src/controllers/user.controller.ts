import { type Request, type Response } from "express";
import { handleHttp } from "../utils/error.handler.ts";
import { type HttpErrorStatus } from "../types/types.ts";
import { 
    deleteuserService as deleteUserService, 
    getusersIDService as getUserByIdService, 
    getusersService as getUsersService, 
    postuserService as createUserService, 
    putuserService as updateUserService 
} from "../services/user.services.ts";
import type { IUser } from "../interfaces/user.interface.ts";


const getUsersController = async (req: Request, res: Response): Promise<void> => {
    console.log("getUsersController called");
    let statusCode: HttpErrorStatus = 500;
    try {
        const users = await getUsersService();
        res.send(users);
    } catch (err) {
        handleHttp(res, "ERROR_GET_USERS", statusCode, err);
    }
};


const getUserByIdController = async (req: Request, res: Response): Promise<void> => {
    let statusCode: HttpErrorStatus = 500;
    try {
        const { id } = req.params;
        if (!id) {
            statusCode = 400;
            return handleHttp(res, "MISSING_ID", statusCode);
        }

        const user = await getUserByIdService(id);
        if (!user) {
            statusCode = 404;
            return handleHttp(res, "USER_NOT_FOUND", statusCode);
        }

        res.send(user);
    } catch (err) {
        handleHttp(res, "ERROR_GET_USER", statusCode, err);
    }
};


const postUserController = async (req: Request, res: Response): Promise<void> => {
    let statusCode: HttpErrorStatus = 500;
    try {
        const newUser = req.body as IUser;

        if (!newUser || !newUser.id || !newUser.name || !newUser.owner || !newUser.email) {
            statusCode = 400;
            return handleHttp(res, "INVALID_USER_DATA", statusCode);
        }

        const users = await getUsersService();
        const exists = users.some(u => u.id === newUser.id);
        if (exists) {
            statusCode = 400;
            return handleHttp(res, "ID_ALREADY_EXISTS", statusCode);
        }

        const createdUser = await createUserService(newUser);
        res.status(201).send(createdUser);
    } catch (err) {
        handleHttp(res, "ERROR_POST_USER", statusCode, err);
    }
};


const putUserController = async (req: Request, res: Response): Promise<void> => {
    let statusCode: HttpErrorStatus = 500;
    try {
        const { id } = req.params;
        if (!id) {
            statusCode = 400;
            return handleHttp(res, "MISSING_ID", statusCode);
        }

        const updateData = req.body as Partial<IUser>;
        if (!updateData || Object.keys(updateData).length === 0) {
            statusCode = 400;
            return handleHttp(res, "NO_DATA_TO_UPDATE", statusCode);
        }

        const updatedUser = await updateUserService(id, updateData);
        if (!updatedUser) {
            statusCode = 404;
            return handleHttp(res, "USER_NOT_FOUND", statusCode);
        }

        res.send(updatedUser);
    } catch (err) {
        handleHttp(res, "ERROR_UPDATE_USER", statusCode, err);
    }
};

const deleteUserController = async (req: Request, res: Response): Promise<void> => {
    let statusCode: HttpErrorStatus = 500;
    try {
        const { id } = req.params;
        if (!id) {
            statusCode = 400;
            return handleHttp(res, "MISSING_ID", statusCode);
        }

        const deletedUser = await deleteUserService(id);
        if (!deletedUser) {
            statusCode = 404;
            return handleHttp(res, "USER_NOT_FOUND", statusCode);
        }

        res.send(deletedUser);
    } catch (err) {
        handleHttp(res, "ERROR_DELETE_USER", statusCode, err);
    }
};

export { 
    getUsersController, 
    getUserByIdController, 
    postUserController, 
    putUserController, 
    deleteUserController 
};
