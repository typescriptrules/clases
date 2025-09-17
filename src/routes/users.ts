import { Router, type Request, type Response} from "express"
import { deleteUsersID, getUser, getUserID, postUsers, putUsersID } from "../controllers/users.ts";
import { validateIdParam } from "../middlewares/validateIdParam.ts";
import { validateNewUser } from "../middlewares/validateNewUser.ts";
import { validateUpdateBody } from "../middlewares/validateUpdateBody.ts";
import { emailLogsMiddleware } from "../middlewares/emailLogs.middleware.ts";

const router:Router = Router();

router.get("/", emailLogsMiddleware, getUser);
router.get("/:id", validateIdParam, getUserID);
router.post("/", validateNewUser, postUsers);
router.put("/:id", validateIdParam, validateUpdateBody, putUsersID);
router.delete("/:id", validateIdParam, deleteUsersID);

export {router}