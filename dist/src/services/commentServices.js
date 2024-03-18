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
const mongoose_1 = __importDefault(require("mongoose"));
const comment_1 = require("../models/comment");
class CommentService {
    // Method to create a new comment
    static createComment(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const commentObj = new comment_1.Comment(comment);
                return yield commentObj.save();
            }
            catch (error) {
                console.log("Error creating comment: ", error);
                return null;
            }
        });
    }
    // Method to get all comments
    static getAllComments() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield comment_1.Comment.find();
                return comments;
            }
            catch (error) {
                console.log("Error getting comments: ", error);
                return null;
            }
        });
    }
    // Method to get a comment by ID
    static getCommentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield comment_1.Comment.findById(id);
                return comment;
            }
            catch (error) {
                console.log("Error getting comment by ID: ", error);
                return null;
            }
        });
    }
    // Method to get a comment by blog ID
    static getCommentByBlogId(blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield comment_1.Comment.find({ blog: new mongoose_1.default.Types.ObjectId(blogId) }).populate({ path: 'author', select: "username profile" });
                console.log(comments);
                return comments;
            }
            catch (error) {
                console.error("Error getting comments by blog ID:", error); // Use console.error for errors
                return null;
            }
        });
    }
    // method to get user comments on a blog
    static getCommentByBlogIdAndUserId(blogId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blogComments = yield comment_1.Comment.find({ blog: blogId, author: userId });
                return blogComments;
            }
            catch (error) {
                console.log("Error getting comment by blog ID and user ID: ", error);
                return null;
            }
        });
    }
    // Method to update a comment by ID
    static updateCommentById(id, updatedComment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield comment_1.Comment.findByIdAndUpdate(id, updatedComment, { new: true });
                return comment;
            }
            catch (error) {
                console.log("Error updating comment by ID: ", error);
                return null;
            }
        });
    }
    // Method to delete a comment by ID
    static deleteCommentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield comment_1.Comment.findByIdAndDelete(id);
                return comment;
            }
            catch (error) {
                console.log("Error deleting comment by ID: ", error);
                return null;
            }
        });
    }
}
exports.default = CommentService;
//# sourceMappingURL=commentServices.js.map