import CommentService from "../services/commentServices";
import { validateCommentObject } from "../models/comment";
import { Request, Response } from "express";

export default class CommentController {
    static async createComment(req: Request, res: Response) {
        try {
            const { error } = validateCommentObject(req.body);
            if (error) {
                res.status(400).send(error.details[0].message);
                return;
            }

            const { author, content, user } = req.body;
            const blogId = req.params.blogId;
            // keeping the comment on the specified blog
            const comment = await CommentService.createComment(author, blogId, user, content);
            if (!comment) {
                res.status(400).send("Comment not created");
                return;
            }

            // Send the created comment object back
            res.status(201).send({ message: "Comment created successfully", createdComment: comment });
        } catch (error) {
            console.error("Error creating comment:", error);
            res.status(500).send("Internal Server Error");
        }
    }

    static async getBlogComments(req: Request, res: Response) {
        const blogId = req.params.blogId;
        try {
            if (!blogId) {
                res.status(400).send("A blog ID is required");
                return;
            }

            const comments = await CommentService.getCommentByBlogId(blogId);
            if (!comments) {
                res.status(400).send("No comments found for this blog");
                return;
            }
            res.status(200).send({ commentsCount: comments.length, comments: comments });
        } catch (e) {
            console.log(e)
            res.status(500).send("Internal server error")
        }
    }

    static async getBlogCommentById(req: Request, res: Response) {
        const { blogId, commentId } = req.params; // Retrieve the blog ID and comment ID from the route parameters
        try {
            if (!blogId || !commentId) {
                res.status(400).send("Both blog ID and comment ID are required");
                return;
            }

            const comment = await CommentService.getCommentById(commentId);
            if (!comment) {
                res.status(400).send("Comment not found");
                return;
            }
            res.status(200).send(comment);
        } catch (e) {
            console.log(e)
            res.status(500).send("Internal server error")
        }
    }

    static async updateBlogComment(req: Request, res: Response) {
        const { blogId, commentId } = req.params; // Retrieve the blog ID and comment ID from the route parameters
        try {
            if (!blogId || !commentId) {
                res.status(400).send("Both blog ID and comment ID are required");
                return;
            }

            const { error } = validateCommentObject(req.body);
            if (error) {
                res.status(400).send(error.details[0].message);
                return;
            }

            const { author, content, blog } = req.body;
            const updatedComment = { author, content, blog };

            const updatedCommentResult = await CommentService.updateCommentById(commentId, updatedComment,);
            if (!updatedCommentResult) {
                res.status(400).send("Comment not found");
                return;
            }
            res.status(200).send(updatedCommentResult);
        } catch (e) {
            console.log(e)
            res.status(500).send("Internal server error")
        }
    }

    static async deleteBlogComment(req: Request, res: Response) {
        const { blogId, commentId } = req.params; // Retrieve the blog ID and comment ID from the route parameters
        try {
            if (!blogId || !commentId) {
                res.status(400).send("Both blog ID and comment ID are required");
                return;
            }

            const deletedComment = await CommentService.deleteCommentById(commentId);
            if (!deletedComment) {
                res.status(400).send("Comment not found");
                return;
            }
            res.status(200).send({ message: "Comment has been deleted successfully", data: deletedComment });
        } catch (e) {
            console.log(e)
            res.status(500).send("Internal server error")
        }
    }
}