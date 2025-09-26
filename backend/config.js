import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const PORT = process.env.PORT || 5555;

// MongoDB Cluster Connection String
export const NovelystClusterMongoURL = process.env.MONGODB_URL;