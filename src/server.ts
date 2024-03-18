import express from "express";
import 'express-async-errors';
import "winston-mongodb"
import mongoose from "mongoose";
import dotenv from 'dotenv';
import morgan from  'morgan';
import cors from "cors";
import * as swaggerui from "swagger-ui-express"

import userRoutes from './routes/userRoutes';
import blogRoutes from './routes/blogRoutes';
import authRoutes from './routes/authRoutes';
import commentRoutes from './routes/commentRoutes';
import messageRoutes from './routes/messgeRoutes';
import swaggerdocs from "./docs/swaggerdocs";



  //getting env variables
  dotenv.config();
  const { mongo_url, mongo_url_test, PORT } = process.env;
  
  const app = express();
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(cors())
  app.use('/uploads', express.static('uploads'));
 

app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/messages', messageRoutes);
app.use("/api/docs", swaggerui.serve, swaggerui.setup(swaggerdocs))



mongoose.connect(mongo_url!).then(() => {
    console.log("Connected to MongoDB");
}).catch((error)=>console.log("error: ", error))
    


const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports= server;


