import { Router } from "express";
import { checkPermissions, validateUserData } from '../middlewares/validateUser.ts'
import { getUsers, getUserById, createUser, deleteUser, updateUser } from "../controllers/users.ts";

const router = Router();

router.get("/", getUsers);

router.get("/:id", getUserById);

router.post(
  "/", 
  validateUserData,   // primero validamos la data
  checkPermissions,   // luego validamos permisos
  createUser          // si todo pasa, llegamos al controller
);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export { router };