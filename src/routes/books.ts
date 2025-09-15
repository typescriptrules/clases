import { Router, type Request, type Response } from 'express';
import {deleteBookController, getBooks, updateBookController} from "../controllers/books.js";
import {addBookController, getBookByIdController} from "../controllers/books.js";
const router:Router = Router();

router.get('/',(req:Request, res:Response) => {
    getBooks(req,res);
})

router.post('/', addBookController);

router.get("/:id", getBookByIdController);

router.put("/:id", updateBookController);

router.delete("/:id", deleteBookController);

export { router };