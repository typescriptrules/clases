import { Router, type Request, type Response } from 'express';
import type {HttpErrorStatus} from "../types/types.js";
import {handleHttp} from "../utils/error.handler.js";
import {getBooksService, addBookService, getBookByIdService, updateBookService, deleteBookService } from "../services/books.service.js";

export const getBooks = (req:Request, res:Response) => {
    let statusCode:HttpErrorStatus = 500;
    try{
        getBooksService().then((response) => {
            res.send(response);
        })
    }catch(e){
        handleHttp(res, "Something crashed your app: ", statusCode, e)
    }
}

export const addBookController = async (req: Request, res: Response) => {
    let statusCode:HttpErrorStatus = 500;
    try {
        const newBook = req.body;
        const savedBook = await addBookService(newBook);
        res.status(201).json(savedBook);
    } catch (e) {
        handleHttp(res, "Something crashed your app: ", statusCode, e)
    }
};

export const getBookByIdController = async (req: Request, res: Response) => {
    let statusCode:HttpErrorStatus = 500;
    try {
        const id = String(req.params.id); // capturamos el :id de la URL
        const book = await getBookByIdService(id, id);

        res.json(book);
    } catch (e) {
        handleHttp(res, "Something crashed your app: ", statusCode, e)
    }
};

export const updateBookController = async (req: Request, res: Response) => {
    let statusCode:HttpErrorStatus = 500;
    try {
        const id = String(req.params.id);
        const updatedData = req.body;

        const updatedBook = await updateBookService(id, updatedData);

        res.json(updatedBook);
    } catch (e) {
        handleHttp(res, "Something crashed your app: ", statusCode, e)
    }
};

export const deleteBookController = async (req: Request, res: Response) => {
    let statusCode:HttpErrorStatus = 500;
    try {
        const id = String(req.params.id);
        const deleted = await deleteBookService(id);
        if (!deleted) {
            return res.status(404).json({ message: "Libro no encontrado" });
        }
        return res.status(200).json({ message: "Libro eliminado" });
    } catch (e) {
        handleHttp(res, "Something crashed your app: ", statusCode, e)
    }
};




