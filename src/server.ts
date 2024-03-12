import express from "express";
import 'express-async-errors';
import "winston-mongodb"
import mongoose from "mongoose";
import dotenv from 'dotenv';
import morgan from  'morgan';
import userRoutes from './routes/userRoutes';
import blogRoutes from './routes/blogRoutes';
import authRoutes from './routes/authRoutes';
import commentRoutes from './routes/commentRoutes';
import messageRoutes from './routes/messgeRoutes';
import { errorHandle } from "./middlewares/upload";


  //getting env variables
  dotenv.config();
  const { mongo_url, PORT } = process.env;
  
  const app = express();
  app.use(express.json());
  app.use(morgan('dev'));
 

app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/messages', messageRoutes);



mongoose.connect(mongo_url!).then(() => {
    console.log("Connected to MongoDB");
}).catch((error)=>console.log("error: ", error))
    


const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports= server;


