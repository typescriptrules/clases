import { type Request, type Response } from 'express';
import { handleHttp } from '../utils/error.handler.ts'
import { type HttpErrorStatus } from '../types/types.ts'
import { getBooks as getBooksService, } from '../services/book.services.ts';
import { getBookById, deleteBook, addBook, NewUpdateBook } from '../services/book.services.ts';
import type { IBook } from "../interfaces/book.interfaces.ts"

const getBook = (req: Request, res: Response) => {
    const statusCode: HttpErrorStatus = 500
    try {
        const { id } = req.params
        if (id) {
            getBookById(id).then((response) => {
                console.log(response)
                res.send(response)
            })
        }
    } catch (err) {
        handleHttp(res, "Something crashed your app", statusCode, err)
    }
}

const getBooks = (req: Request, res: Response) => {
    const statusCode: HttpErrorStatus = 500
    try {
        getBooksService().then((response) => {
            console.log(response)
            res.send(response)
        })
    } catch (err) {
        handleHttp(res, "Something crashed your app", statusCode, err)
    }
}

const deleteBooks = (req: Request, res: Response) => {
    const statusCode: HttpErrorStatus = 500
    try {
        const { id } = req.params
        if (id) {
            deleteBook(id).then((response) => {
                console.log(response)
                res.send(response)
            })
        }

    } catch (err) {
        handleHttp(res, "Something crashed your app", statusCode, err)
    }
}

const createBook = (req: Request, res: Response) => {
    const statusCode: HttpErrorStatus = 500
    try {
        const newBook: IBook = req.body;
        addBook(newBook).then((Response) => {
            console.log("Libro creado:");
            console.log(Response)
            res.send(Response)
        });


    } catch (err) {
        handleHttp(res, "Something crashed your app", statusCode, err)
    }
}

const updateBooks =  (req: Request, res: Response) => {
    let statusCode:HttpErrorStatus = 500;
    try {
         const { id } = req.params
        if (id) {
            const data = req.body;
            const updatedBook = NewUpdateBook(id, data);
            res.send(updatedBook);
        }
    }catch(err){
        handleHttp(res, "Something crashed your app", statusCode, err)
    }
}

export { getBook, getBooks, deleteBooks, createBook, updateBooks }