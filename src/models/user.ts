import { Schema, model } from "mongoose";
import Joi from "joi";
import jwt, { Secret } from "jsonwebtoken";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

interface IUserSchemaMethods {
  generateAuthToken(id: string): string;
}

//User interface 
export interface IUser {
  _id?: string;
  username: string;
  email: string;
  password: string;
  profile?: string;
  role?: 'admin' | 'author' | 'reader';
}

// Mongoose  schema for user with validation rules and methods
const userSchema: Schema<IUser> = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profile: { type: String, default: "" },
  role: { type: String, enum: ['admin', 'author', 'reader'], default: "reader", }
},{
  timestamps: true
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

// a method to generate token when user after authentication
export function generateAuthToken (id: string) {
  if (!process.env.SECRET_KEY) {
    throw new Error('SECRET_KEY environment variable not set');
  }

  const secretKey = process.env.SECRET_KEY as Secret;

  return jwt.sign({ id }, secretKey, { expiresIn: '1d' });
};

// user model for mongoose interation  with MongoDB
export const User = model<IUser>('User', userSchema);

//  function to validate user object from request body
export const validateUserObject = (user: IUser) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    profile: Joi.string().optional(),
    role: Joi.string().required().optional(),
  });

  return schema.validate(user);
};

export function validateSignIn(user:IUser) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
}
