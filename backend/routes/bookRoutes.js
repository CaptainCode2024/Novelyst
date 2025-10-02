import express from 'express'; // Backend Framework
import { Book } from "../models/bookModel.js"  // Book Model

const router = express.Router(); // Create a router instance

// Route to add a new book
router.post('/', async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({
                message: "Send all the required fields: title, author, publishYear"
            });
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);

    }
    catch(error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get all books from database
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});  // Find all books
        
        return response.status(200).json({
            count: books.length,
            data: books
        });
    }
    catch(error) {
        console.log(error.message);
        response.status(500).send({ message: error.message }); 
    }
});

// Route to get a single book by ID from database
router.get('/:id', async (request, response) => {
    try {

        const id = request.params.id;  // Get ID from request parameters

        const book = await Book.findById(id);  // Find book by ID
        
        return response.status(200).json(book);
    }
    catch(error) {
        console.log(error.message);
        response.status(500).send({ message: error.message }); 
    }
});

// Route to update a book
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.title || 
            !request.body.author || 
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: "Send all the required fields: title, author, publishYear"
            });
        }
        
        const { id } = request.params;  // Get ID from request parameters
        const result = await Book.findByIdAndUpdate(id, request.body);  // Update book by ID
        
        if(!result) {
            return response.status(404).send({ message: `Book with id: ${id} not found` });
        }

        return response.status(200).send({ message: "Book updated successfully" });
    }
        
    catch(error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to delete a book
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;  // Get ID from request parameters
        const result = await Book.findByIdAndDelete(id);  // Delete book by ID

        if(!result) {
            return response.status(404).json({ message: `Book with id: ${id} not found` });
        }

        return response.status(200).json({ message: "Book deleted successfully" });
    }
    catch(error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;  // Export the router