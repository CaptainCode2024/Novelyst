import express from "express";  // Backend Framework
import { PORT, NovelystClusterMongoURL } from "./config.js";
import mongoose from "mongoose";  // ODM library for MongoDB - Node.js
import bookRoutes from "./routes/bookRoutes.js" // Book Routes
import cors from "cors"; // Import CORS middleware

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS Policy
app.use(cors()); // Enable CORS for all routes

// More specific CORS configuration (optional)
/*
app.use(
    cors({
        origin: 'http://localhost:3000', // Allow requests from this origin  
        methods: ['GET', 'POST', 'PUT', 'DELETE'],    
        allowedHeaders: ['Content-Type']  
    })
);
*/

// First Route
app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to Novelyst')
});

app.use('/books', bookRoutes); // Use book routes

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