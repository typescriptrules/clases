import { Router, type Request, type Response } from 'express'
import { createBook, getBook, getBooks, deleteBooks, updateBook } from '../controllers/books.ts'

const router:Router = Router()

  http://localhost:3003/books
 

router.get("/", (req:Request, res:Response)=> {
    console.log("vamos ok")
    getBooks(req, res)
})
router.get('/:id', getBook)
router.post('/', createBook)
router.delete('/:id', deleteBooks)
router.put('/:id',updateBook )



export { router }