import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRoutes from './src/routes/userRoutes';
import blogRoutes from './src/routes/blogRoutes';
import authRoutes from './src/routes/authRoutes';
import commentRoutes from './src/routes/commentRoutes';
dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/comments', commentRoutes);

const { mongo_url, PORT } = process.env;

mongoose.connect(mongo_url!).then(() => {
    console.log("Connected to the database");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => {
    console.error("Error connecting to the database:", error);
});
