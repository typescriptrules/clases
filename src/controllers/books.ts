import { type Request, type Response } from "express";
import { handleHttp } from "../utils/error.handler.ts";
import { type HttpErrorStatus } from "../types/types.ts";
import { getBooks as getBooksService, getBookById, addBook, deleteBook, updateBook as updateBookService,} from "../services/book.service.ts";

import type { IBook } from "../interfaces/book.interface.ts";

const getBook = async (req: Request, res: Response) => {
  const statusCode: HttpErrorStatus = 500;
  try {
    const { id } = req.params;
    const book = await getBookById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (err) {
    handleHttp(res, "Something crashed your app", statusCode, err);
  }
};

const getBooks = (req: Request, res: Response) => {
  try {
    console.log("Entra", req);
    getBooksService().then((response) => {
      console.log(response);
      res.send(response);
    });
  } catch (err) {
    handleHttp(res, "Error getting books", 500, err);
  }
};

const createBook = async (req: Request, res: Response) => {
  try {
    const { id, author, name, ouwner } = req.body as IBook;

    if (!id || !author || !name || !ouwner) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBook: IBook = { id, author, name, ouwner };
    await addBook(newBook);

    res.status(201).json({ message: "Book created", book: newBook });
  } catch (err) {
    handleHttp(res, "Error creating book", 500, err);
  }
};

// DELETE /books/:id
const deleteBooks = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await deleteBook(id);
    if (!deleted) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted" });
  } catch (err) {
    handleHttp(res, "Error deleting book", 500, err);
  }
};

// PUT /books/:id
const updateBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedData = req.body as Partial<IBook>;

    if (!id) {
      return res.status(400).json({ message: "Missing book id" });
    }

    const updatedBook = await updateBookService(id, updatedData);
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book updated", book: updatedBook });
  } catch (err) {
    handleHttp(res, "Error updating book", 500, err);
  }
};

export { getBook, getBooks, deleteBooks, createBook, updateBook };
