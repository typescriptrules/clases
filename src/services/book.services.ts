import { promises as fs } from "fs";
import type { IBook } from "../interfaces/book.interface.ts";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import type { promises } from "dns";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, "../models/book.json");

export const getBooksService = async (): Promise<IBook[]> => {
  const res = await fs.readFile(filePath, "utf-8");
  console.log("filePath", filePath);
  return JSON.parse(res) as IBook[];
};

export const getBookService = async (id: string): Promise<IBook | null> => {
  const response = await getBooksService();
  return response.find((book) => book.id === id) || null;
};

export const postBookService = async (newBook: IBook): Promise<void> => {
  const response = await getBooksService();
  response.push(newBook);
  return fs.writeFile(filePath, JSON.stringify(response));
};

export const deleteBookService = async (id: string): Promise<boolean> => {
  const response = await getBooksService();
  const data = response.filter((res) => res.id !== id);
  if (data.length === response.length) {
    return false;
  } else {
    await fs.writeFile(filePath, JSON.stringify(data));
    return true;
  }
};

export const updateBookService = async (id: string, updates: Partial<Omit<IBook, 'id'>>): Promise<IBook | null> => {
    const books = await getBooksService()
    const index = books.findIndex(b => b.id === id)

    if (index === -1) return null

    const book = books[index]!
    const updatedBook: IBook = { ...book, ...updates, id: book.id }
    books[index] = updatedBook

    await fs.writeFile(filePath, JSON.stringify(books, null, 2), 'utf-8')
    return updatedBook
}


