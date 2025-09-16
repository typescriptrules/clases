import { type Request, type Response } from 'express';
import { handlerHttp } from '../utils/error.handler.ts';
import { type HttpErrorStatus } from '../types/types.ts';
import { getBooksService, getBookByIdService , createBookService, updateBookService, deleteBookService } from '../services/book.services.ts';
import { v4 as uuid } from 'uuid'

export const getBooks = async (req: Request, res: Response)=>{
    let statusCode:HttpErrorStatus = 500
    try {
        statusCode = 200
        const books = await getBooksService();
        res.status(statusCode).json(books);
    }catch(err){
        handlerHttp(res, "Someting crashed your app", statusCode, err)
    }
}

export const getById = async (req: Request, res: Response)=>{
    let statusCode:HttpErrorStatus = 500
    try{
        const { id } = req.params

        if (!id){
            statusCode = 400
            return res.status(statusCode).json({
                message: 'Where is the id?'
            })
        }

        const book = await getBookByIdService(id)

        if (!book){
            statusCode = 404
            return res.status(statusCode).json({
                message: 'Book not found'
            })
        }

        statusCode = 200
        return res.status(statusCode).json(book)
    }catch(err){
        handlerHttp(res, "Someting crashed your app", statusCode, err)
    }
}

export const createBook = async (req: Request, res: Response) => {
    let statusCode:HttpErrorStatus = 500
    try {
        const { author, name, ouwner } = req.body

        if (!author || !name || !ouwner ) {
            statusCode = 400
            return res.status(statusCode).json({
                message: 'Faltan campos obligatorios'
            })
        }

        const newBook = {
            id: uuid(),
            author,
            name,
            ouwner
        }

        const savedBook = await createBookService(newBook)
        res.status(statusCode).json(savedBook)
    }catch(err){
        res.status(statusCode).json({
            message: 'Error al cargar el libro'
        })
    }
}


export const updatedBook = async (req: Request, res: Response) => {
    let statusCode:HttpErrorStatus = 500

    try {
        const { id } = req.params
        const { author, name, ouwner } = req.body

        if (!id){
            statusCode = 400
            return res.status(statusCode).json({
                message: 'Id is required'
            })
        }

        const update = await updateBookService(id, {author, name, ouwner})

        if (!update){
            statusCode = 404
            return res.status(statusCode).json({
                message: "Book not found"
            })
        }

        statusCode = 200
        return res.status(statusCode).json(update)

    }catch(err){
        console.error('Error updating book: ', err)
        return res.status(statusCode).json({
            message: 'internal server error'
        })
    }
}

export const deletedBook = async (req: Request, res: Response) => {
    let statusCode:HttpErrorStatus = 500
    try{
        const { id } = req.params
        if  (!id) {
            statusCode = 400
            return res.status(statusCode).json({
                message: 'Id is required'
            })
        }

        const deleted = await deleteBookService(id)
        if (!deleted) {
            statusCode = 404
            return res.status(statusCode).json({
                message: 'Book not found'
            })
        }
        statusCode = 200
        return res.status(statusCode).json({
            message: 'Book deleted',
            book: deleted
        })

    }catch(err){
        console.error('err', err)
        return res.status(statusCode).json({
            message:'internal server error'
        })
    }
}