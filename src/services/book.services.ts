// services/book.services.ts
import { promises as fs } from "fs";
import type { IBook } from "../interface/book.interface.ts";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, "../models/books.json");

/** Helpers */
const readBooksFromFile = async (): Promise<IBook[]> => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data) as IBook[];
  } catch (err: any) {
    // si no existe el archivo, devolvemos array vacío
    if (err.code === "ENOENT") return [];
    throw err;
  }
};

const writeBooksToFile = async (books: IBook[]): Promise<void> => {
  await fs.writeFile(filePath, JSON.stringify(books, null, 2), "utf-8");
};

/** Services */
const getBooksService = async (): Promise<IBook[]> => {
  return await readBooksFromFile();
};

const createBookService = async (newBook: IBook): Promise<IBook> => {
  const books = await readBooksFromFile();

  // Generar id simple si no viene
  if (!newBook.id) {
    newBook.id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  } else {
    // si el id ya existe, lanzamos error (puedes cambiar la lógica si prefieres sobrescribir)
    const exists = books.find((b) => b.id === newBook.id);
    if (exists) throw new Error("A book with that id already exists");
  }

  books.push(newBook);
  await writeBooksToFile(books);
  return newBook;
};

const deleteBookService = async (id: string): Promise<boolean> => {
  const books = await readBooksFromFile();
  const index = books.findIndex((b) => b.id === id);
  if (index === -1) return false;

  books.splice(index, 1);
  await writeBooksToFile(books);
  return true;
};

const updateBookService = async (
  id: string,
  data: IBook
): Promise<IBook | null> => {
  const books = await readBooksFromFile();
  const index = books.findIndex((b) => b.id === id);
  if (index === -1) return null;

  const updated: IBook = { ...books[index], ...data, id }; 
  books[index] = updated;

  await writeBooksToFile(books);
  return updated;
};


export {
  getBooksService,
  createBookService,
  deleteBookService,
  updateBookService,
};

import axios from "axios";
import logger from "../utils/logger.ts";

// Simula traer libros de una API pública 
export const fetchExternalBooks = async () => {
  try {
    const response = await axios.get("https://openlibrary.org/subjects/love.json?limit=5");
    logger.info(`External API called - received ${response.data.works.length} books`);
    return response.data.works;
  } catch (error: any) {
    logger.error(`Error fetching external books: ${error.message}`);
    throw error;
  }
};

