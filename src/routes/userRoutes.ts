import { Router } from "express";
import { listUsers, getUser, addUser, editUser, removeUser } from "../controllers/userController";
import { validateUser } from "../middlewares/validateUser";

const router: Router = Router();

router.get("/", listUsers);
router.get("/:id", getUser);
router.post("/", validateUser, addUser);
router.put("/:id", editUser);
router.delete("/:id", removeUser);

export default router;
