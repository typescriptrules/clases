import { type Request, type Response } from "express";
import { handleHttp } from "../utils/error.handlers.ts";
import { type HttpErrorStatus } from "../types/types.ts";
import { getBooksService, getBookByIdService, createBookService, deleteBookService, updateBookService } from "../service/book.services.ts";

export const getBooks = (req:Request, res:Response):void => {
    let statusCode:HttpErrorStatus = 500;
    try {
        getBooksService()
        .then((response) => res.send(response))
        .catch((error) => handleHttp(res, "Error al obtener libros", 500, error));
    } catch(error){
        handleHttp(res, "Something crashed your app", statusCode, error);
    }
};

export const getBookById = async (req: Request, res: Response): Promise<void> => {
  let statusCode: HttpErrorStatus = 500;
  try {
    const { id } = req.params;
    const book = await getBookByIdService(id!);

    if (!book) {
      res.status(404).json({
        ok: false,
        message: "Book not found",
      });
      return;
    }

    res.status(200).json({
      ok: true,
      data: book,
    });
  } catch (error) {
    handleHttp(res, "error getting book by id", statusCode, error);
  }
};
    
export const createBook = async (req: Request, res: Response): Promise<void> => {
  let statusCode: HttpErrorStatus = 500;
  try {
    const body = req.body;
    const newBook = await createBookService(body); 
    res.status(201).json({
      ok: true,
      message: "Book created successfully",
      data: newBook,
    });
  } catch (error) {
    handleHttp(res, "error when creating book", statusCode, error);
  }
};

export const deleteBook = async (req: Request, res: Response): Promise<void> => {
  let statusCode: HttpErrorStatus = 500;
  try {
    const { id } = req.params;

    const deleted = await deleteBookService(id!);

    if (!deleted) {
      res.status(404).json({
        ok: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      ok: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    handleHttp(res, "error when deleting book", statusCode, error);
  }
};

export const updateBook = async (req: Request, res: Response): Promise<void> => {
    let statusCode: HttpErrorStatus = 500;
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedBook = await updateBookService(id!, updateData);

        if (!updatedBook) {
            res.status(404).json({
                ok: false,
                message: "Book not found",
            });
            return;
        }

        res.status(200).json({
            ok: true,
            message: "Book updated successfully",
            data: updatedBook,
        });
    } catch (error) {
        handleHttp(res, "error when updating book", statusCode, error);
    }
};


