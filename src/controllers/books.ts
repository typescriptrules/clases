import { type Request, type Response } from "express";
import { handleHttp } from "../utils/error.handler.ts";
import { type HttpErrorStatus } from "../types/types.ts";
import { getBookService, getBooksService, createBookService, deleteBookService, updateBookService } from "../services/book.services.ts";
import type { IBook } from "../interfaces/book.interface.ts";

const getBook = (req: Request<{ id: string }>, res: Response) => {  
    const statusCode: HttpErrorStatus = 500;
    const { id } = req.params;
    try {
        getBookService(id).then((response) => {
            if (!response) {
                res.status(404).send({ message: "Book not found" });
            } else {
                res.send(response);
            }
        })
    }catch(err){
        handleHttp(res, "ERROR_GET_BOOK", statusCode, err);
    }
};

const getBooks = (req:Request, res:Response):void => {
    let statusCode:HttpErrorStatus = 500;
    try {
        getBooksService().then((response) => {
            res.send(response);
        })
    } catch (err) {
        handleHttp(res, 'ERROR_GET_BOOKS', statusCode, err);
    }

};

const createBook = (req: Request, res: Response): void => {
    let statusCode:HttpErrorStatus = 500;
    try {
        const book = req.body;
        createBookService(book).then((response) => {
        res.send(response);
        });
    }catch(err){
        handleHttp(res, "ERROR_POST_BOOK", statusCode, err);
    }
}

const deleteBook = (req: Request<{ id: string }>, res: Response) => {  
    let statusCode:HttpErrorStatus = 500;
    const { id } = req.params;
    try {
        deleteBookService(id).then((response) => {
            res.send(response);
        })

    }catch(err){
        handleHttp(res, "ERROR_DDELETE_BOOK", statusCode, err);
    }
}

const updateBook = (req: Request<{ id: string }>, res: Response) => { 
    let statusCode:HttpErrorStatus = 500; 
    const { id } = req.params;
    const book:IBook = req.body;

    try {
        updateBookService(id, book).then((response) => {
            if (!response) {
                res.status(404).send({ message: "Book not found" });
            } else {
                res.send(response);
            }
        })
    }catch(err){
        handleHttp(res, "ERROR_PUT_BOOK", statusCode, err);
    }
}

export { getBook, getBooks, createBook, deleteBook, updateBook}
