import {Router} from "express";
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from "../controllers/users.ts";
import { randomColorMiddleware } from "../middlewares/randomColor.ts";

const router = Router();

router.get("/", getUsers);
router.get("/:id", randomColorMiddleware, getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export {router};