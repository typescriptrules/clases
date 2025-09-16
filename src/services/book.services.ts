import { promises as fs } from "fs";
import type { IBook, updateBookDTO } from "../interfaces/book.interface.ts";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const filePath = join(__dirname, '../models/books.json')

const getBooksService = async (): Promise <IBook[]> => {
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data) as IBook[]
}

const getBookByIdService = async (id: string): Promise <IBook | null> => {
    const data = await fs.readFile(filePath, 'utf-8')
    const books = JSON.parse(data) as IBook[]

    return books.find(b => b.id === id)?? null

}


const createBookService = async (book: IBook): Promise <IBook> => {
    const data = await fs.readFile(filePath, 'utf-8')
    const books: IBook[] = JSON.parse(data)

    books.push(book)

    await fs.writeFile(filePath, JSON.stringify(books, null, 2))

    return book
}


const updateBookService = async (id:string, data: updateBookDTO): Promise <IBook | null > => {
    const file = await fs.readFile(filePath, 'utf-8')
    const books: IBook[] = JSON.parse(file)

    const index = books.findIndex(b => b.id === id)
    if (index === -1) return null

    const book = books[index]
    if (!book) return null

    const updatedBook: IBook = {
        ...books[index]!, 
        ...data, 
        id: books[index]!.id  
    }

    books[index] = updatedBook
    await fs.writeFile(filePath, JSON.stringify(books, null, 2))

    return updatedBook
}

const deleteBookService = async (id:string): Promise <IBook | null> => {
    const file = await fs.readFile(filePath, 'utf-8')
    const books: IBook[] = JSON.parse(file)

    const index = books.findIndex(b => b.id === id)
    if (index === -1) return null

    const [deletedBook] = books.splice(index,1)

    await fs.writeFile(filePath, JSON.stringify(books, null, 2))

    return deletedBook ?? null

}

export { getBooksService, getBookByIdService, createBookService, updateBookService, deleteBookService };