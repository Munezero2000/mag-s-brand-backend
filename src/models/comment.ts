import { Schema, model } from "mongoose";
import {IUser as User} from "./user";
import Joi from "joi";

export interface IComment {
    _id?:string;
    author: User["_id"]; 
    content: string;
    dateCreated?: Date;
}

const commentSchema: Schema<IComment> = new Schema<IComment>({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User document
    content: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now }
});

export const Comment = model<IComment>('Comment', commentSchema);

export const validateCommentObject = (comment: IComment) => {
    const schema = Joi.object({
        author: Joi.string().required(), 
        content: Joi.string().required().min(9) 
    });

    return schema.validate(comment);
};
