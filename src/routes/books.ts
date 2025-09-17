import { Router, type Request, type Response } from "express";
import { getBook, getBooks, createBook, deleteBook, updateBook} from "../controllers/books.ts";

const router:Router = Router();

router.get('/:id', (req: Request<{ id: string }>, res: Response) => {
    console.log(`Printing book ${req.params.id}`);
    getBook(req, res);
});

router.get('/', (req:Request, res:Response) => {
    console.log('Printing books');
    getBooks(req, res);
});

router.post('/', (req: Request, res: Response) => {
  console.log('Creating book');
  createBook(req, res);
});

router.delete('/:id', (req: Request<{ id: string }>, res: Response) => {
  console.log(`Deleting book ${req.params.id}`);
  deleteBook(req, res);
});

router.put('/:id', (req: Request<{ id: string }>, res: Response) => {
  console.log(`Updating book ${req.params.id}`);
  updateBook(req, res);
});

export { router };
