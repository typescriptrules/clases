import { Router } from "express";
import { 
    getUsersController, 
    getUserByIdController, 
    postUserController, 
    putUserController, 
    deleteUserController 
} from "../controllers/user.controller.ts";

const router: Router = Router();

router.get("/", getUsersController);
router.get("/:id", getUserByIdController);
router.post("/", postUserController);
router.put("/:id", putUserController);
router.delete("/:id", deleteUserController);

console.log("User routes initialized");

export { router };

