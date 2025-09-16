import {promises as fs} from 'fs';
import type {IBook} from '../interfaces/book.interface.ts'
import {dirname, join} from 'path';
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, '../models/books.json');

const getBooksService = async (): Promise<IBook[]> => {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as IBook[];
}

const getBookByIdService = async (id: string | undefined): Promise<IBook | null> => {
    const books = await getBooksService();
    return books.find((book) => book.id === id) || null;
};

const createBookService = async (newBook: Omit<IBook, "id">): Promise<IBook> => {
    const books = await getBooksService();
    const maxId = books.length > 0 ? Math.max(...books.map((b) => Number(b.id))) : 0;
    const bookWithId: IBook = {
        id: String(maxId + 1),
        ...newBook,
    };
    books.push(bookWithId);
    await fs.writeFile(filePath, JSON.stringify(books, null, 2));
    return bookWithId;
};

const updateBookService = async (
    id: string | undefined,
    updatedData: Partial<IBook>
): Promise<IBook | null> => {
    const books = await getBooksService();
    const index = books.findIndex((book) => book.id === id);
    if (index === -1) return null;
    books[index] = {...books[index], ...updatedData} as IBook;
    await fs.writeFile(filePath, JSON.stringify(books, null, 2));
    return books[index];
};


const deleteBookService = async (id: string | undefined): Promise<boolean> => {
    const books = await getBooksService();
    const filtered = books.filter((book) => book.id !== id);
    if (books.length === filtered.length) return false;

    await fs.writeFile(filePath, JSON.stringify(filtered, null, 2));
    return true;
};

export {
    getBooksService,
    getBookByIdService,
    createBookService,
    updateBookService,
    deleteBookService,
};