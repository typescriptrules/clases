import { Router, type Request, type Response } from 'express';
import { getBooks, createBook, deleteBook, getBookById, updateBook } from '../controllers/books.ts';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    getBooks(req, res);
});

router.get('/:id', (req: Request, res: Response) => {
    getBookById(req, res);
});

router.post('/', (req: Request, res: Response) => {
    createBook(req, res);
});

router.delete("/:id", (req: Request, res: Response) => {
  deleteBook(req, res);
});

router.put("/:id", (req: Request, res: Response) => {
    updateBook(req, res);
});

export { router };
