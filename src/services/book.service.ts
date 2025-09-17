import { promises as fs } from 'fs'
import { type IBook } from '../interfaces/book.interface.ts'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const filePath = join(__dirname, '../models/books.json')





// services, controllers, routes





// get all books
const getBooksService = async (): Promise<IBook[]> => {
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data) as IBook[]
}

// get book by id
const getBookByIdService = async (id: string): Promise<IBook | null> => {
    const books = await getBooksService()
    const book = books.find((b) => b.id === id)
    return book || null
}


// delete book by id
const deleteBookByIdService = async (id: string): Promise<IBook | null> => {
    const books = await getBooksService()
    const book = books.find((b) => b.id === id)
    if (!book) {
        return null
    }
    const filteredBooks = books.filter((b) => b.id !== id)
    await fs.writeFile(filePath, JSON.stringify(filteredBooks, null, 2))
    return book
}


// create book
const createBookService = async (newBook: IBook): Promise<IBook> => {
    const books = await getBooksService()
    books.push(newBook)
    await fs.writeFile(filePath, JSON.stringify(books, null, 2))
    return newBook
}


// update book by id
const updateBookByIdService = async (id: string, updatedBook: Partial<IBook>): Promise<IBook | null> => {
    const books = await getBooksService()
    const bookIndex = books.findIndex((b) => b.id === id)
    if(bookIndex === -1) {
        return null;
    } else {
        const book = books[bookIndex];
        const updated: IBook = {
            id: book.id,
            author: updatedBook.author ?? book.author,
            name: updatedBook.name ?? book.name,
            owner: updatedBook.owner ?? book.owner
        };
        books[bookIndex] = updated;
        await fs.writeFile(filePath, JSON.stringify(books, null, 2));
        return updated; 
    }
}

export { getBooksService, getBookByIdService, deleteBookByIdService, createBookService, updateBookByIdService }