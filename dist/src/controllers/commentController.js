"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commentServices_1 = __importDefault(require("../services/commentServices"));
const comment_1 = require("../models/comment");
class CommentController {
    static createComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = (0, comment_1.validateCommentObject)(req.body);
                if (error) {
                    res.status(400).send(error.details[0].message);
                    return;
                }
                const { author, blog, content } = req.body;
                const comment = yield commentServices_1.default.createComment(req.body);
                if (!comment) {
                    res.status(400).send("Comment not created");
                    return;
                }
                // Send the created comment object back
                res.status(201).send({ message: "Comment created successfully", createdComment: comment });
            }
            catch (error) {
                console.error("Error creating comment:", error);
                res.status(500).send("Internal Server Error");
            }
        });
    }
    static getBlogComments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogId = req.params.blogId;
            try {
                if (!blogId) {
                    res.status(400).send("A blog ID is required");
                    return;
                }
                const comments = yield commentServices_1.default.getCommentByBlogId(blogId);
                if (!comments) {
                    res.status(400).send("No comments found for this blog");
                    return;
                }
                res.status(200).send({ commentsCount: comments.length, comments: comments });
            }
            catch (e) {
                console.log(e);
                res.status(500).send("Internal server error");
            }
        });
    }
    static getBlogCommentById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { blogId, commentId } = req.params; // Retrieve the blog ID and comment ID from the route parameters
            try {
                if (!blogId || !commentId) {
                    res.status(400).send("Both blog ID and comment ID are required");
                    return;
                }
                const comment = yield commentServices_1.default.getCommentById(commentId);
                if (!comment) {
                    res.status(400).send("Comment not found");
                    return;
                }
                res.status(200).send(comment);
            }
            catch (e) {
                console.log(e);
                res.status(500).send("Internal server error");
            }
        });
    }
    static updateBlogComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { blogId, commentId } = req.params; // Retrieve the blog ID and comment ID from the route parameters
            try {
                if (!blogId || !commentId) {
                    res.status(400).send("Both blog ID and comment ID are required");
                    return;
                }
                const { error } = (0, comment_1.validateCommentObject)(req.body);
                if (error) {
                    res.status(400).send(error.details[0].message);
                    return;
                }
                const { author, content, blog } = req.body;
                const updatedComment = { author, content, blog };
                const updatedCommentResult = yield commentServices_1.default.updateCommentById(commentId, updatedComment);
                if (!updatedCommentResult) {
                    res.status(400).send("Comment not found");
                    return;
                }
                res.status(200).send(updatedCommentResult);
            }
            catch (e) {
                console.log(e);
                res.status(500).send("Internal server error");
            }
        });
    }
    static deleteBlogComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { blogId, commentId } = req.params; // Retrieve the blog ID and comment ID from the route parameters
            try {
                if (!blogId || !commentId) {
                    res.status(400).send("Both blog ID and comment ID are required");
                    return;
                }
                const deletedComment = yield commentServices_1.default.deleteCommentById(commentId);
                if (!deletedComment) {
                    res.status(400).send("Comment not found");
                    return;
                }
                res.status(200).send({ message: "Comment has been deleted successfully", data: deletedComment });
            }
            catch (e) {
                console.log(e);
                res.status(500).send("Internal server error");
            }
        });
    }
}
exports.default = CommentController;
//# sourceMappingURL=commentController.js.map