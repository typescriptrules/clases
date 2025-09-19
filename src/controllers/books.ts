import { type Request, type Response } from "express";
import { handleHttp } from '../utils/error.handler.ts'
import { type HttpErrorStatus } from "../types/types.ts";
import {
  getBooksService,
  createBookService,
  deleteBookService,
  updateBookService,
} from "../services/book.services.ts";
import type { IBook } from "../interface/book.interface.ts";
import { log } from "node:console";

export const getBooks = async (req: Request, res: Response) => {
  let statuscode: HttpErrorStatus = 500;
  try {
    const response = await getBooksService();
    res.send(response);
  } catch (err) {
    handleHttp(res, "Error getting books", statuscode, err);
  }
};

export const createBook = async (req: Request, res: Response) => {
console.log('Libro Creado', req.body);

  let statuscode: HttpErrorStatus = 500;
  try {
    const newBook: IBook = req.body;

    const response = await createBookService(newBook);
    res.status(201).send(response);
  } catch (err) {
    handleHttp(res, "Error creating book", statuscode, err);
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  let statuscode: HttpErrorStatus = 500;
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ error: "ID is required" });
    }

    const response = await deleteBookService(id);
    res.send(response);
  } catch (err) {
    handleHttp(res, "Error deleting book", statuscode, err);
  }
};

export const updateBook = async (req: Request, res: Response) => {
  let statuscode: HttpErrorStatus = 500;
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ error: "ID is required" });
    }

    const response = await updateBookService(id, req.body);
    if (!response) {
      return res.status(404).send({ error: "Book not found" });
    }

    res.send(response);
  } catch (err) {
    handleHttp(res, "Error updating book", statuscode, err);
  }
};

