import { Router, type Request, type Response } from 'express'
import { createBook, getBook, getBooks, deleteBooks, updateBook } from '../controllers/books.ts'

const router:Router = Router()
/**
 * http://localhost:3002/books
 */

router.get("/", getBooks)
router.get('/:id', getBook)
router.post('/', createBook)
router.put('/:id', updateBook)
router.delete('/:id', deleteBooks)

export { router }