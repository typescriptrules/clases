import { Router } from "express";
import { validateUserMiddleware } from "../middlewares/validateUser.middleware.ts"
import { getUserController, getUserIdController, postUserController, deleteUserContoller, updateUserController } from "../controllers/user.controllers.ts";

const router: Router = Router();

router.get("/", getUserController);
router.get("/:id", getUserIdController);
router.post("/", postUserController);
router.delete("/:id", deleteUserContoller);
router.put("/:id", updateUserController);
router.use( validateUserMiddleware );


export { router };