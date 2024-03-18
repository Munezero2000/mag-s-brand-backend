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
Object.defineProperty(exports, "__esModule", { value: true });
const blog_1 = require("../models/blog");
class BlogService {
    // Method to create a new blog post
    static createBlog(title, content, author, category, status, thumbnail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!title || !content || !author) {
                    throw new Error("Invalid blog data");
                }
                const blog = new blog_1.Blog({ title, content, author, category, status, thumbnail });
                return yield blog.save();
            }
            catch (error) {
                console.log("Error creating blog: ", error);
                return null;
            }
        });
    }
    // Method to get all blog posts
    static getAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blogs = yield blog_1.Blog.find().populate({ path: "author", select: "profile username email" });
                return blogs;
            }
            catch (error) {
                console.log("Error getting blogs: ", error);
                return null;
            }
        });
    }
    // Method to get a blog post by ID
    static getBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blog = yield blog_1.Blog.findById(id).populate({ path: "author", select: "profile username email" });
                ;
                return blog;
            }
            catch (error) {
                console.log("Error getting blog by ID: ", error);
                return null;
            }
        });
    }
    // Method to update a blog post by ID
    static updateBlogById(id, updatedBlog) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blog = yield blog_1.Blog.findByIdAndUpdate(id, updatedBlog, { new: true });
                return blog;
            }
            catch (error) {
                console.log("Error updating blog by ID: ", error);
                return null;
            }
        });
    }
    // Method to delete a blog post by ID
    static deleteBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blog = yield blog_1.Blog.findByIdAndDelete(id);
                return blog;
            }
            catch (error) {
                console.log("Error deleting blog by ID: ", error);
                return null;
            }
        });
    }
}
exports.default = BlogService;
//# sourceMappingURL=blogServices.js.map