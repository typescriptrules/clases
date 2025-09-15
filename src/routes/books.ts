import { response, Router, type Request, type Response } from 'express'
import { getBooks, getBookById, deleteBookById, createBook, updateBookById } from '../controllers/books.ts'

const router: Router = Router()

// get all books
router.get('/', (req:Request, res:Response) => {
    getBooks(req, res)
})

// get book by id
router.get('/:id', (req:Request, res:Response) => {
        getBookById(req, res);
})

// delete book by id
router.delete('/:id', (req:Request, res:Response) => {
        deleteBookById(req, res);
})


// create book
router.post('/', (req:Request, res:Response) => {
        createBook(req, res);
})

// update book by id
router.put('/:id', (req:Request, res:Response) => {
        updateBookById(req, res);
})

export { router }