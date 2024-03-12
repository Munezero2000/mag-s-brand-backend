import { IComment, Comment } from "../models/comment";

export default class CommentService {
    // Method to create a new comment
    static async createComment(
        blog: string,
        author: string,
        content: string
    ) {
        try {
            if (!author || !content || !blog) {
                throw new Error("Invalid comment data");
            }
            const comment = new Comment({ author, blog, content });
            return await comment.save();
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
    static async getCommentByBlogId(blogId: string) {
        try {
            const blogComments = await Comment.find({ blog: blogId });
            return blogComments;
        } catch (error) {
            console.log("Error getting comment by ID: ", error)
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
