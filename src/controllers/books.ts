import { response, type Request, type Response } from "express";
import { handleHttp } from "../utils/error.handler.ts";
import { type HttpErrorStatus } from "../types/types.ts";
import { deleteBooksService, getBooksIDservice, getBooksService, postBooksService, putBooksService } from "../services/book.service.ts";
import type { IBook } from "../interfaces/book.interface.ts";

const getBooks = (req:Request, res:Response):void => {
    let statusCode:HttpErrorStatus = 500;
    try {
        getBooksService().then((response) => {
            res.send(response)
        })
    } catch (err) {
        handleHttp(res, 'ERROR_GET_BOOKS', statusCode, err);
    }
};

const getBooksID = async (req:Request, res:Response ): Promise<void> => {
    let statusCode:HttpErrorStatus = 500;
    try {
        const {id} = req.params;
        if (!id){
            statusCode = 400;
            return handleHttp(res, 'ERROR_GET_BOOKS', statusCode);
        }
        const book = await getBooksIDservice(id)

        if (!book) {
            statusCode = 404;
            return handleHttp(res, 'BOOK_NOT_FOUND', statusCode);
        }
        res.send(response)
        
    } catch ( err ){
        handleHttp(res, 'ERROR_GET_BOOKS', statusCode, err);
    }
}

const postBooks = async (req: Request, res: Response): Promise<void> => {
    let statusCode: HttpErrorStatus = 500;
    try {
        const newBook = req.body as IBook;

        if (!newBook || !newBook.id || !newBook.author || !newBook.name || !newBook.owner) {
            statusCode = 400;
            return handleHttp(res, 'INVALID_BOOK_DATA', statusCode);
        }

        const books = await getBooksService();
        const exists = books.some(b => b.id === newBook.id);
        if (exists) {
            statusCode = 400;
            return handleHttp(res, "ID_ALREADY_EXISTS", statusCode);
        }
        const createdBook = await postBooksService(newBook);
        res.status(201).send(createdBook);
    } catch (err) {
        handleHttp(res, 'ERROR_POST_BOOK', statusCode, err);
    }
};

const putBooksID = async (req:Request, res:Response ):Promise<void> => {
    let statusCode:HttpErrorStatus = 500;
    try {
        const { id } = req.params;
        if (!id){
            statusCode = 400;
            return handleHttp(res, 'ERROR_GET_BOOKS', statusCode);
        }

        const updateData = req.body as Partial<IBook>;

        if (!updateData || Object.keys(updateData).length === 0) {
            statusCode = 400;
            return handleHttp(res, "NO_DATA_TO_UPDATE", statusCode);
        }

        const books = await putBooksService(id, updateData)
        if (!books) {
            statusCode = 404;
            return handleHttp(res, "BOOK_NOT_FOUND", statusCode);
        }
        res.send(books)
    } catch ( err ){
        handleHttp(res, 'ERROR_GET_BOOKS', statusCode, err);
    }
}

const deleteBooksID = async (req:Request, res:Response ):Promise<void> => {
    let statusCode:HttpErrorStatus = 500;
    try {
        const {id} = req.params;
        if (!id){
            statusCode = 400;
            return handleHttp(res, 'ERROR_GET_BOOKS', statusCode);
        }
        const book = await deleteBooksService(id)

        if (!book) {
            statusCode = 404;
            return handleHttp(res, 'BOOK_NOT_FOUND', statusCode);
        }

        res.send(book)
        
    } catch ( err ){
        handleHttp(res, 'ERROR_GET_BOOKS', statusCode, err);
    }
}


export { getBooks, getBooksID, postBooks, putBooksID, deleteBooksID }