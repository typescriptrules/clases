import { Router } from "express";
import { validateUserMiddleware } from "../middlewares/validateUser.middleware.ts"
import { getUserController } from "../controllers/users.controllers.ts";

const router: Router = Router();

router.get("/", getUserController);
router.use( validateUserMiddleware );


export { router };