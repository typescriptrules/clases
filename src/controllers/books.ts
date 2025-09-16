import { type Request, type Response } from 'express';
import { handleHttp } from '../utils/error.handler.ts'
import { type HttpErrorStatus } from '../types/types.ts'
import { getBooks as getBooksService } from '../services/book.service.ts';

const getBook = (req: Request, res: Response) => {  
    const statusCode: HttpErrorStatus = 500
    try {
        
    }catch(err){
        handleHttp(res, "Something crashed your app", statusCode, err)
    }
}

const getBooks = (req: Request, res: Response) => {  
    try {
        console.log("Entra", req)
        getBooksService().then((response)=>{
            console.log(response)
            res.send(response)
        })
    }catch(err){
        
    }
}

const deleteBooks = async (req: Request, res: Response) => {  
    try {
        const { id } = req.params;
        if (!id || typeof id !== 'string') {
            return res.status(400).json({ message: 'ID is required' });
        }
        const deleted = await deleteBookService(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
    } catch(err) {
        handleHttp(res, "Error deleting book", 500, err);
    }
}

const createBook = async (req: Request, res: Response) => {  
    try {
        const newBook = req.body;
        if (!newBook || !newBook.id || !newBook.author || !newBook.name || !newBook.ouwner) {
            return res.status(400).json({ message: 'Missing required book fields' });
        }
        await addBookService(newBook);
        res.status(201).json({ message: 'Book created successfully', book: newBook });
    } catch(err) {
        handleHttp(res, "Error creating book", 500, err);
    }
}

const updateBooks = await updateBookService(id, updatedData);  
    try {
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.json({ message: "Book updated", book: updatedBook });
    }catch(err){
        handleHttp(res, "Error updating book", 500, err);

    }



export { getBook, getBooks, deleteBooks, createBook, updateBooks}