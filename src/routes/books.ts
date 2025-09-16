import { Router, type Request, type Response } from 'express';
import { getBooks, getById, createBook, updatedBook, deletedBook } from '../controllers/books.controller.ts';

const router:Router = Router()

router.get('/', (req: Request, res: Response)=>{
    getBooks(req, res)
});

router.get('/:id', (req: Request, res: Response) => {
    getById(req, res)
});

router.post('/', (req: Request, res: Response) => {
    createBook(req, res)
});

router.put('/:id', (req: Request, res: Response) =>{
    updatedBook(req, res)
})

router.delete('/:id', (req: Request, res: Response) => {
    deletedBook(req, res)
})

export { router }