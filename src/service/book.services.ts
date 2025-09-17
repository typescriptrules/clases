import { promises as fs } from 'fs';
import type { IBook } from '../interfaces/book.interface.ts';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, '../models/books.json');

const getBooksService = async (): Promise<IBook[]> => {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as IBook[];
}

const getBookByIdService = async (id: string): Promise<IBook | null> => {
    const data = await fs.readFile(filePath, 'utf-8');
    const books: IBook[] = JSON.parse(data);
    const book = books.find((b) => b.id === id);
    return book || null;
};

const createBookService = async (bookData: Omit<IBook, 'id'>): Promise<IBook> => {

    const data = await fs.readFile(filePath, 'utf-8');
    const books: IBook[] = JSON.parse(data);

    if(!bookData.name || !bookData.author || !bookData.owner) {
        throw new Error('Missing required book fields');
    }

    const newBook: IBook = {
        id: (books.length + 1).toString(), // Simple ID generation
        ...bookData,
    };

    books.push(newBook);
    await fs.writeFile(filePath, JSON.stringify(books, null, 2), 'utf-8');

    return newBook;
};

const deleteBookService = async (id: string): Promise<boolean> => {
  const data = await fs.readFile(filePath, "utf-8");
  const books: IBook[] = JSON.parse(data);

  const index = books.findIndex((book) => book.id === id);

  if (index === -1) {
    return false;
  }

  books.splice(index, 1); 
  await fs.writeFile(filePath, JSON.stringify(books, null, 2), "utf-8");

  return true; 
};

const updateBookService = async (id: string, updateData: Partial<IBook>): Promise<IBook | null> => {
    const data = await fs.readFile(filePath, 'utf-8');
    const books: IBook[] = JSON.parse(data);
    const index = books.findIndex((b) => b.id === id);

    if (index === -1) {
        return null;
    }

    const updatedBook = { ...books[index]!,  ...updateData };
    books[index] = updatedBook;

    await fs.writeFile(filePath, JSON.stringify(books, null, 2), 'utf-8');

    return updatedBook;
};


export { getBooksService, getBookByIdService, createBookService, deleteBookService, updateBookService };
