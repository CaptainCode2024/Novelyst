import express from "express";  // backend framework
import {PORT, NovelystClusterMongoURL} from "./config.js";
import mongoose from "mongoose";  // ODM library for MongoDB - Node.js

const app = express();

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to Novelyst')
}); 

/*
app.listen(PORT, () => {
    console.log(`App is listening to the port ${PORT}`);
});
*/

mongoose
    .connect(NovelystClusterMongoURL)  // returns a Promise
    .then(() => {
        console.log("App connected to database");

        app.listen(PORT, () => {
            console.log(`App is listening to the port ${PORT}`);
        });

    })
    .catch((error) => {
        console.log(error);
    });