import { type Request, type Response } from 'express';
import { handleHttp } from '../utils/error.handler.ts'
import { type HttpErrorStatus } from '../types/types.ts'
import { 
    getBooksService, 
    getBookByIdService, 
    addBookService, 
    deleteBookService, 
    updateBookService} from '../services/book.service.ts';

// Book controllers
const getBook = async (req: Request, res: Response) => {  
    let statusCode: HttpErrorStatus = 500
    try {
        statusCode = 200
        const books = await getBooksService()
        res.status(statusCode).json(books)
    }catch(err){
        handleHttp(res, "Something crashed your app", statusCode, err)
    }
}

const getBooksById =  async (req: Request, res: Response) => {
    let statusCode: HttpErrorStatus = 500
    try {
        statusCode = 200
        const { id } = req.params

        if (!id){
            statusCode = 400
            throw new Error("Book id is required")
            return res.status(statusCode).json({error: "Book id is required"})
        }

        const book = await getBookByIdService(id)

        if(!book) statusCode = 404
        res.status(statusCode).json(book)
    }catch(err){
        handleHttp(res, "Something crashed your app", statusCode, err)        
    }
}

const deleteBooks = async (req: Request, res: Response) => { 
    let statusCode: HttpErrorStatus = 500 
    try {
        statusCode = 200
        const { id } = req.params

        if (!id){
            statusCode = 400
            throw new Error("Book id is required")
            return res.status(statusCode).json({error: "Book id is required"})
        }

        const book = await deleteBookService(id)

        if(!book) statusCode = 404
        res.status(statusCode).json(book)
    }catch(err){
        handleHttp(res, "Something crashed your app", statusCode, err)        
    }
}

const createBook = async(req: Request, res: Response) => {  
    let statusCode: HttpErrorStatus = 500
    try {
        statusCode = 200
        const {author, name, ouwner} = req.body

        if (!author || !name || !ouwner){
            statusCode = 400
            throw new Error("Book author, name and ouwner are required")
        }

        const newBook = {
            id: (Math.random() * 1000000).toFixed(0),
            author,
            name,
            ouwner
        }

        await addBookService(newBook)
        res.status(statusCode).json(newBook)
    }catch(err){
        handleHttp(res, "Something crashed your app", statusCode, err)
    }
}

const updateBooks = async (req: Request, res: Response) => {  
    let statusCode: HttpErrorStatus = 500
    try {
        const {author, name, ouwner} = req.body
        const { id } = req.params

        if (!id){
            statusCode = 400
            throw new Error("Book id is required")
        }

        const update = await updateBookService(id, {author, name, ouwner})
        
        if(!update) {
            statusCode = 404
        res.status(statusCode).json({
            message: "Book not found"
        })
        return
        }

        statusCode = 200
        res.status(statusCode).json(update)
    }catch(err){
        console.error('Error updating book:', err);
        return res.status(statusCode).json({ error: 'Internal Server Error' });
    }
}

export { getBook, getBooksById, deleteBooks, createBook, updateBooks}