import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRoutes from './src/routes/userRoutes';
import { any } from "joi";
dotenv.config();

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

const { mongo_url, PORT } = process.env;

mongoose.connect(mongo_url!).then(() => {
    console.log("Connected to the database");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the application if there's an error connecting to MongoDB
});
