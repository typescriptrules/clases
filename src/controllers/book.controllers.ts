import { type Request, type Response } from "express";
import { getBooksService, getBookService, postBookService, deleteBookService, updateBookService } from "../services/book.services.ts";
import type { IBook } from "../interfaces/book.interface.ts";
import { handleHttp } from "../utils/error.handler.ts";
import { type HttpErrorStatus } from "../types/types.ts";

export const getBooksController = async (req: Request, res: Response) => {
  try {
    console.log(req.query);
    const response = await getBooksService();
    res.json(response);
  } catch (error) {
    handleHttp(res, 'Error fetching user', 500 as HttpErrorStatus, error)
  }
};

export const getBookController = async (req: Request, res:Response) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
    const response = await getBookService(id)
    res.json(response)
  } catch (error) {
    handleHttp(res, 'Error fetching user', 500 as HttpErrorStatus, error)
  }
}

export const postBookController = async (req: Request, res: Response) => {
  try {
    const { id, author, name, ouwner } = req.body as IBook;

    const newbook : IBook = { id, author, name, ouwner };
    await postBookService(newbook);
    res.status(201).json({ message: "Creado exitosamente", book: newbook})
  } catch (error) {
    handleHttp(res, 'Error creating user', 500 as HttpErrorStatus, error)
  }
}

export const deleteBookController = async ( req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
    const response = await deleteBookService(id)
    res.status(200).json({ mensage: "Eliminado correctamante", book: response})    
  } catch (error) {
    handleHttp(res, 'Error deleting user', 500 as HttpErrorStatus, error)
  }
}

export const updateBookController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string }

        const updatedBook = await updateBookService(id, req.body)

        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' })
        }

        res.json(updatedBook)
    } catch (error) {
        handleHttp(res, 'Error updating book', 500 as HttpErrorStatus, error)
    }
}

