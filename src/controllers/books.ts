import { type Request, type Response } from 'express';
import { handleHttp } from '../utils/error.handler.ts'
import { type HttpErrorStatus } from '../types/types.ts'
import { getBooks as getBooksService, getBookById, addBook, deleteBook } from '../services/book.service.ts';

const getBook = (req: Request, res: Response) => {  
    const statusCode: HttpErrorStatus = 500
    try {
        const { id } = req.params;
        if (!id) {
            return handleHttp(res, 'Book ID is required', 400);
        }
        getBookById(id).then(book => {
            if (!book) {
                return handleHttp(res, 'Book not found', 404);
            }
            res.status(200).json(book);
        });
    }catch(err){
        handleHttp(res, "Error getting book", statusCode, err);
    }
}

const getBooks = (req: Request, res: Response) => {  
    try {
        getBooksService().then(books => {
            res.status(200).json(books);
        }).catch(err => {
            handleHttp(res, 'Error getting books', 500, err);
        });
    }catch(err){
        handleHttp(res, 'Error getting books', 500, err);
    }
}

const createBook = (req: Request, res: Response) => {  
    try {
        const { author, name, owner } = req.body;
        if (!author || !name || !owner) {
            return handleHttp(res, 'Missing required fields', 400);
        }
        
        const newBook = {
            id: Date.now().toString(),
            author,
            name,
            owner
        };
        
        addBook(newBook).then(() => {
            res.status(201).json(newBook);
        });
    }catch(err){
        handleHttp(res, 'Error creating book', 500, err);
    }
}

const updateBooks = (req: Request, res: Response) => {  
    try {
        const { id } = req.params;
        if (!id) {
            return handleHttp(res, 'Book ID is required', 400);
        }
        
        const { author, name, owner } = req.body;
        
        getBookById(id).then(book => {
            if (!book) {
                return handleHttp(res, 'Book not found', 404);
            }
            
            const updatedBook = {
                ...book,
                author: author || book.author,
                name: name || book.name,
                owner: owner || book.owner
            };
            
            deleteBook(id).then(() => {
                return addBook(updatedBook);
            }).then(() => {
                res.status(200).json(updatedBook);
            });
        });
    }catch(err){
        handleHttp(res, 'Error updating book', 500, err);
    }
}

const deleteBooks = (req: Request, res: Response) => {  
    const { id } = req.params;
    if (!id) {
        return handleHttp(res, 'Book ID is required', 400);
    }
    
    deleteBook(id)
        .then(isDeleted => {
            if (!isDeleted) {
                return handleHttp(res, 'Book not found', 404);
            }
            res.status(204).send();
        })
        .catch(err => {
            handleHttp(res, 'Error deleting book', 500, err);
        });
}




export { getBook, getBooks, deleteBooks, createBook, updateBooks}