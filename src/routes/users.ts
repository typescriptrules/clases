import { Router } from "express";
import {
    listUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/users.controller.js";
import { requireFixedToken, requireRole } from "../middlewares/auth.js";
import { validateUserCreate, validateUserUpdate } from "../middlewares/validateUser.js";

const router = Router();

// Protege TODO /users con token
router.use(requireFixedToken);

// Logger por ruta (opcional)
// router.use(logger);

// CRUD
router.get("/", listUsers);
router.get("/:id", getUserById);

// Validar body en POST/PUT
router.post("/", validateUserCreate, createUser);
router.put("/:id", validateUserUpdate, updateUser);

// Solo "admin" puede borrar
router.delete("/:id", requireRole("admin"), deleteUser);

export default router;
