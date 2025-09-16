import { promises as fs } from "fs";
import { type IBook } from "../interfaces/book.interface.ts";
import { dirname,join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, '../models/books.json');

const getBookService = async (id:string):Promise<IBook|null> => {
    const data = await fs.readFile(filePath, 'utf-8');
    // SELECT * FROM BOOKS WHERE ID = id
    const books:IBook[] = JSON.parse(data) as IBook[];
    const book = books.find(book => book.id === id) || null;
    return book;
}

const getBooksService = async ():Promise<IBook[]> => {
    // SELECT * FROM BOOKS
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as IBook[];
}

const createBookService = async (book:IBook):Promise<IBook> => {
    const data = await fs.readFile(filePath, 'utf-8');
    const books:IBook[] = JSON.parse(data) as IBook[];
    // INSERT INTO BOOKS VALUES (...)
    books.push(book);
    await fs.writeFile(filePath, JSON.stringify(books, null, 2), 'utf-8');
    return book;
}

const deleteBookService = async (id:string):Promise<void> => {
    const data = await fs.readFile(filePath, 'utf-8');
    const books:IBook[] = JSON.parse(data) as IBook[];
    // DELETE FROM BOOKS WHERE ID = id
    const newBooks = books.filter(book => book.id !== id);
    await fs.writeFile(filePath, JSON.stringify(newBooks, null, 2), 'utf-8');
}

const updateBookService = async (id:string, book:IBook):Promise<IBook|null> => {
    const data = await fs.readFile(filePath, 'utf-8');
    const books:IBook[] = JSON.parse(data) as IBook[];
    // UPDATE BOOKS SET ... WHERE ID = id
    const index = books.findIndex(book => book.id === id);
    if(index === -1) return null;
    books[index] = book;
    await fs.writeFile(filePath, JSON.stringify(books, null, 2), 'utf-8');
    return book;
}

export { getBookService, getBooksService, createBookService, deleteBookService, updateBookService };
