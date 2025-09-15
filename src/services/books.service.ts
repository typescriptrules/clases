import {promises as fs} from 'fs';
import type { IBook } from '../interfaces/book.interface.js'
import { dirname, join } from 'path';
import { fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, '../models/books.json');

const getBooksService = async (): Promise<IBook[]>=> {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as IBook[];
}

const addBookService = async (newBook: IBook): Promise<IBook> => {
    const books = await getBooksService();
    books.push(newBook);
    await fs.writeFile(filePath, JSON.stringify(books, null, 2), "utf-8");
    return newBook;
};

const getBookByIdService = async (number: string, id: string): Promise<IBook | null> => {
    const books = await getBooksService();
    const book = books.find((b) => b.id === id);
    return book || null;
};

const updateBookService = async (id: string, updatedData: Partial<IBook>): Promise<IBook | null> => {
    const books = await getBooksService();

    const index = books.findIndex((b) => b.id === id);
    if (index === -1) return null;

    const updatedBook = { ...books[index], ...updatedData };
    books[index] = updatedBook;

    await fs.writeFile(filePath, JSON.stringify(books, null, 2), "utf-8");

    return updatedBook;
};

const deleteBookService = async (id: string): Promise<boolean> => {
    const books = await getBooksService();
    const initialLen = books.length;

    const filtered = books.filter(b => b.id !== id);
    if (filtered.length === initialLen) return false;

    await fs.writeFile(filePath, JSON.stringify(filtered, null, 2), "utf-8");
    return true;
};
export { getBooksService, addBookService, getBookByIdService, updateBookService, deleteBookService };