import express from "express";
import { asyncHandle } from "async-handler-express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import blogRoutes from './routes/blogRoutes';
import authRoutes from './routes/authRoutes';
import commentRoutes from './routes/commentRoutes';
import messageRoutes from './routes/messgeRoutes';
dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/comments', commentRoutes);
app.use('api/message', messageRoutes);

const { mongo_url, PORT } = process.env;

mongoose.connect(mongo_url!).then(() => {
    console.log("Connected to MongoDB");
})

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports= server;


