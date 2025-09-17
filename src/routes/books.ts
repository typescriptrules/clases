import { Router, type Request, type Response } from 'express'
import { getBook, getBooksById, createBook, deleteBooks, updateBooks} from '../controllers/books.ts'

const router:Router = Router()

router.get('/', (req: Request, res: Response)=>{
    getBook(req, res)
});

router.get('/:id', (req: Request, res: Response) => {
    getBooksById(req, res)
});

router.post('/', (req: Request, res: Response) => {
    createBook(req, res)
});

router.put('/:id', (req: Request, res: Response) =>{
    updateBooks(req, res)
})

router.delete('/:id', (req: Request, res: Response) => {
    deleteBooks(req, res)
})

export { router }