import { type Request, type Response } from 'express'
import { handleHttp } from '../utils/error.handler.ts'
import { type HttpErrorStatus } from '../types/types.ts'
import { getBooksService, getBookByIdService, deleteBookByIdService, createBookService, updateBookByIdService } from '../services/book.service.ts'
import { stat } from 'fs'


// get all books
const getBooks = (req:Request, res:Response) =>{
    let statusCode:HttpErrorStatus = 500
    try {
        getBooksService().then((response) => {
            res.send(response)
        })
    } catch(err) {
        handleHttp(res, 'Something crashed your app', statusCode, err)
    }
}


// get book by id
const getBookById = (req:Request, res:Response) => {
    let statusCode:HttpErrorStatus = 500
    try {
        const { id } = req.params
        if (!id) {
            statusCode = 400;
            handleHttp(res, 'Book ID is required', statusCode)
            return;
        }
        getBookByIdService(id).then((response) => {
            if (response) {
                res.send(response)
            } else {
                statusCode = 404
                handleHttp(res, 'Book not found', statusCode)
            }
        })
    } catch(err) {
        handleHttp(res, 'Something crashed your app', statusCode, err)
    }
}


// delete book by id
const deleteBookById = (req:Request, res:Response) => {
    let statusCode:HttpErrorStatus = 500
    try {
        const { id } = req.params
        if (!id) {
            statusCode = 400;
            handleHttp(res, 'Book ID is required', statusCode)
            return;
        }
        deleteBookByIdService(id).then((response) => {
            if (response) {
                res.send({ message: 'Book deleted successfully', book: response})
            } else {
                statusCode = 404
                handleHttp(res, 'Book not found', statusCode)
            }
        })
    } catch(err) {
        handleHttp(res, 'Something crashed your app', statusCode, err)
    }
}

// create book
const createBook = async (req:Request, res:Response) => {
    let statusCode:HttpErrorStatus = 500
    try {
        const { body } = req;
        if (!body || !body.id || !body.author || !body.name || !body.owner) {
            statusCode = 400;
            return handleHttp(res, 'Invalid book data', statusCode)
        }

        const response = await createBookService(body);

        if(response) {
            return res.status(201).json({ message: 'Book created successfully', book: response });
        } else{
            statusCode = 400;
            return handleHttp(res, 'Book could not be created', statusCode);
        }
    } catch(err) {
        return handleHttp(res, 'Something crashed your app', statusCode, err);
    }
}

// update book by id
const updateBookById = (req:Request, res:Response) => {
    let statusCode:HttpErrorStatus = 500
    try {
        const { id } = req.params
        const { body } = req
        if (!id) {
            statusCode = 400;
            handleHttp(res, 'Book ID is required', statusCode)
            return;
        } 
        if (!body) {
            statusCode = 400;
            handleHttp(res, 'Invalid book data', statusCode)
            return;
        }
        updateBookByIdService(id, body).then((response) => {
            if(response) {
                res.send({ message: 'Book updated successfully', book: response})
            } else {
                statusCode = 404
                handleHttp(res, 'Book not found', statusCode)
            }
        })
    } catch(err) {
        handleHttp(res, 'Something crashed your app', statusCode, err)
    }
}

export { getBooks, getBookById, deleteBookById, createBook, updateBookById }