import { Router, type Request, type Response} from "express"
import { deleteBooksID, getBooks, getBooksID, postBooks, putBooksID } from "../controllers/books.ts";

const router:Router = Router();

router.get("/", getBooks);
router.get("/:id", getBooksID);
router.post("/", postBooks);
router.put("/:id", putBooksID);
router.delete("/:id", deleteBooksID);

export {router}