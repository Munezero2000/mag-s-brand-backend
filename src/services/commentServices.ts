import mongoose from "mongoose";
import { IComment, Comment } from "../models/comment";


export default class CommentService {
    // Method to create a new comment
    static async createComment(comment: IComment) {
        try {
            const commentObj = new Comment(comment);
            return await commentObj.save();
        } catch (error) {
            console.log("Error creating comment: ", error)
            return null;
        }
    }

    // Method to get all comments
    static async getAllComments() {
        try {
            const comments = await Comment.find();
            return comments;
        } catch (error) {
            console.log("Error getting comments: ", error)
            return null;
        }
    }

    // Method to get a comment by ID
    static async getCommentById(id: string) {
        try {
            const comment = await Comment.findById(id);
            return comment;
        } catch (error) {
            console.log("Error getting comment by ID: ", error)
            return null;
        }
    }

    // Method to get a comment by blog ID
    static async getCommentByBlogId(blogId: string): Promise<Comment[] | null> {
        try {
            const comments: Comment[] | null = await Comment.find({ blog: new mongoose.Types.ObjectId(blogId) }).populate({ path: 'author', select:"username profile" });
            console.log(comments);
            return comments;
        } catch (error) {
            console.error("Error getting comments by blog ID:", error); // Use console.error for errors
            return null;
        }
    }


    // method to get user comments on a blog
    static async getCommentByBlogIdAndUserId(blogId: string, userId: string) {
        try {
            const blogComments = await Comment.find({ blog: blogId, author: userId });
            return blogComments;
        } catch (error) {
            console.log("Error getting comment by blog ID and user ID: ", error);
            return null;
        }
    }


    // Method to update a comment by ID
    static async updateCommentById(id: string, updatedComment: IComment) {
        try {
            const comment = await Comment.findByIdAndUpdate(id, updatedComment, { new: true });
            return comment;
        } catch (error) {
            console.log("Error updating comment by ID: ", error)
            return null;
        }
    }

    // Method to delete a comment by ID
    static async deleteCommentById(id: string) {
        try {
            const comment = await Comment.findByIdAndDelete(id);
            return comment;
        } catch (error) {
            console.log("Error deleting comment by ID: ", error)
            return null;
        }
    }
}
