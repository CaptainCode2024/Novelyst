import express from "express";  // Backend Framework
import {PORT, NovelystClusterMongoURL} from "./config.js";
import mongoose from "mongoose";  // ODM library for MongoDB - Node.js
import {Book} from "./models/book.js"  // Book Model


const app = express();

// Middleware for parsing request body
app.use(express.json());

// First Route
app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to Novelyst')
}); 

// Route to add a new book
app.post('/books', async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({
                message: "Send all the required fields: title, author, publishYear"
            })
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
        response.status(500).send({message: error.message});
    }
});

// Route to get all books from database
app.get('/books', async (request, response) => {
    try {
        const books = await Book.find({});  // Find all books
        
        return response.status(200).json({
            count: books.length,
            data: books
        });
    }
    catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message}); 
    }
});

// Route to get a single book by ID from database
app.get('/books/:id', async (request, response) => {
    try {

        const id = request.params.id;  // Get ID from request parameters

        const book = await Book.findById(id);  // Find book by ID
        
        return response.status(200).json(book);
    }
    catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message}); 
    }
});

// Connect to NovelystCluster @MongoDB 
mongoose
    .connect(NovelystClusterMongoURL)  // Returns a Promise
    .then(() => {
        console.log("App connected to database");

        app.listen(PORT, () => {
            console.log(`App is listening to the port ${PORT}`);
        });

    })
    .catch((error) => {
        console.log(error);
    });