import { Schema, model } from "mongoose";
import Joi from "joi";
import bcrypt from 'bcrypt';

// Define the User interface
export interface IUser {
    _id?: string;
    username: string;
    email: string;
    password: string;
    profile?: string;
    role?: 'admin' | 'author' | 'reader'; 
}

// Define the Mongoose schema for the User model
const userSchema: Schema<IUser> = new Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profile: { type: String},
    role: { type: String, enum: ['admin', 'author', 'reader'], default : "reader",  } 
});

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
  });

// Define and export the User model
export const User = model<IUser>('User', userSchema);

// Define Joi validation schema for User object
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
