import { type Request, type Response } from "express";
import { handleHttp } from "../utils/error.handlers.ts";
import { type HttpErrorStatus } from "../types/types.ts";
import { getUsersService, getUserByIdService, createUserService, deleteUserService, updateUserService } from "../service/user.services.ts";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  let statusCode: HttpErrorStatus = 500;
  try {
    const users = await getUsersService();
    res.status(200).json({ ok: true, data: users });
  } catch (error) {
    handleHttp(res, "Error al obtener usuarios", statusCode, error);
  }
};


export const getUserById = async (req: Request, res: Response): Promise<void> => {
  let statusCode: HttpErrorStatus = 500;
  try {
    const { id } = req.params;
    const user = await getUserByIdService(id!);

    if (!user) {
      res.status(404).json({
        ok: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      ok: true,
      data: user,
    });
  } catch (error) {
    handleHttp(res, "error getting user by id", statusCode, error);
  }
};
    
export const createUser = async (req: Request, res: Response): Promise<void> => {
  let statusCode: HttpErrorStatus = 500;
  try {
    const body = req.body;
    const newUser = await createUserService(body); 
    res.status(201).json({
      ok: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    handleHttp(res, "error when creating user", statusCode, error);
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  let statusCode: HttpErrorStatus = 500;
  try {
    const { id } = req.params;

    const deleted = await deleteUserService(id!);
    if (!deleted) {
      res.status(404).json({
        ok: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      ok: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    handleHttp(res, "error deleting user", statusCode, error);
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  let statusCode: HttpErrorStatus = 500;
  try {
    const { id } = req.params;
    const body = req.body;

    const updatedUser = await updateUserService(id!, body);
    if (!updatedUser) {
      res.status(404).json({
        ok: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      ok: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    handleHttp(res, "error updating user", statusCode, error);
  }
};