import {type Request, type Response} from 'express';
import type {HttpErrorStatus} from "../types/types.ts";
import {handleHttp} from "../utils/error.handler.ts";
import {
    getBooksService,
    getBookByIdService,
    createBookService,
    updateBookService,
    deleteBookService,
} from "../services/books.service.ts";
import type {IBook} from "../interfaces/book.interface.js";

export const getBooks = (req: Request, res: Response) => {
    let statusCode: HttpErrorStatus = 500;
    try {
        getBooksService().then((response) => {
            res.send(response);
        })
    } catch (e) {
        handleHttp(res, "Something crashed your app: ", statusCode, e)
    }
}

export const getBookById = (req: Request, res: Response): void => {
    let statusCode: HttpErrorStatus = 404;
    try {
        const {id} = req.params;
        getBookByIdService(id).then((book) => {
            if (!book) return res.status(404).send({message: "Book not found"});
            res.send(book);
        });
    } catch (e) {
        handleHttp(res, "Something crashed your app: ", statusCode, e);
    }
};

export const createBook = async (req: Request, res: Response): Promise<void> => {
    let statusCode: HttpErrorStatus = 400;
    try {
        const newBook: Omit<IBook, "id"> = req.body;
        const book = await createBookService(newBook);
        res.status(201).send(book);
    } catch (e) {
        handleHttp(res, "Something crashed your app: ", statusCode, e);
    }
};

export const updateBook = async (req: Request, res: Response): Promise<void> => {
    let statusCode: HttpErrorStatus = 404;
    try {
        const {id} = req.params;
        const updatedData: Partial<IBook> = req.body;

        const book = await updateBookService(id, updatedData);
        if (!book) {
            res.status(404).send({message: "Book not found"});
            return;
        }
        res.send(book);
    } catch (e) {
        handleHttp(res, "Something crashed your app: ", statusCode, e);
    }
};

export const deleteBook = (req: Request, res: Response): void => {
    let statusCode: HttpErrorStatus = 404;
    try {
        const {id} = req.params;
        deleteBookService(id).then((success) => {
            if (!success) return res.status(404).send({message: "Book not found"});
            res.send({message: "Book deleted successfully"});
        });
    } catch (e) {
        handleHttp(res, "Something crashed your app: ", statusCode, e);
    }
};