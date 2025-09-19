import { Router } from 'express';
import { getBooks, createBook, deleteBook, updateBook } from '../controllers/books.ts';

const router: Router = Router();


router.get('/', (req, res) => getBooks(req, res));
router.post('/', (req, res) => createBook(req, res));
router.delete('/:id', (req, res) => deleteBook(req, res));
router.put('/:id', (req, res) => updateBook(req, res));
export { router };  