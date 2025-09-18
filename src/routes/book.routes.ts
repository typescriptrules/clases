import { Router } from "express";
import { validateBookMiddleware } from "../middlewares/validateBook.middleware.ts"
import { getBooksController, getBookController, postBookController, deleteBookController, updateBookController } from "../controllers/book.controllers.ts";

const router: Router = Router();

router.get("/", getBooksController);
router.get("/:id", getBookController);
router.post("/", postBookController);
router.delete("/:id", deleteBookController);
router.put("/:id", updateBookController);
router.use( validateBookMiddleware );

export { router };