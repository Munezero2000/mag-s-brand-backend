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
const blog_1 = require("../models/blog");
const blogServices_1 = __importDefault(require("../services/blogServices"));
const cloudinary_config_1 = __importDefault(require("../cloudinary.config"));
class BlogController {
    static gettAllBogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blogs = yield blogServices_1.default.getAllBlogs();
                res.status(200).send({ blogsCount: blogs.length, blogs: blogs });
            }
            catch (e) {
                console.log(e);
                res.status(500).send("Internal server error");
            }
        });
    }
    static getBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const blog = yield blogServices_1.default.getBlogById(id);
                if (!blog) {
                    res.status(404).send("Blog not found");
                    return;
                }
                res.status(200).send(blog);
            }
            catch (e) {
                console.log(e);
                res.status(500).send("Internal server error");
            }
        });
    }
    static createBlog(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = (0, blog_1.validateBlogObject)(req.body);
                console.log(req.body);
                if (error) {
                    res.status(400).send(error.details[0].message); // Return error message if validation fails
                    return;
                }
                const uploadResult = yield cloudinary_config_1.default.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
                let thumbnail = uploadResult.secure_url || "default";
                const { title, content, author, category, status, } = req.body;
                // Save the blog to the database
                const blog = yield blogServices_1.default.createBlog(title, content, author, category, status, thumbnail);
                if (!blog) {
                    res.status(400).send({ message: "Blog not created" });
                    return;
                }
                // Send the created blog object back
                res.status(201).send({ message: "Blog created successfully", createdBlog: blog });
            }
            catch (error) {
                console.error("Error creating blog:", error);
                res.status(500).send("Internal Server Error");
            }
        });
    }
    static updateBlog(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                if (!id) {
                    res.status(400).send("A blog ID is required");
                    return;
                }
                const uploadResult = yield cloudinary_config_1.default.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
                let thumbnail = uploadResult.secure_url || "default";
                const { title, content, author, category, status, } = req.body;
                const updatedBlog = { title, content, author, category, status, thumbnail };
                const updatedBlogResult = yield blogServices_1.default.updateBlogById(id, updatedBlog);
                if (!updatedBlogResult) {
                    res.status(404).send("Blog not found");
                    return;
                }
                res.status(200).send(updatedBlogResult);
            }
            catch (e) {
                console.log(e);
                res.status(500).send("Internal server error");
            }
        });
    }
    static updateBlogLikes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                if (!id) {
                    res.status(400).send("A blog ID is required");
                    return;
                }
                const { likes } = req.body;
                const updatedBlog = { likes };
                const updatedBlogResult = yield blogServices_1.default.updateBlogById(id, updatedBlog);
                if (!updatedBlogResult) {
                    res.status(404).send("Blog not found");
                    return;
                }
                res.status(200).send(updatedBlogResult);
            }
            catch (e) {
                console.log(e);
                res.status(500).send("Internal server error");
            }
        });
    }
    static deleteBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                if (!id) {
                    res.status(400).send("A blog ID is required");
                    return;
                }
                const deletedBlog = yield blogServices_1.default.deleteBlogById(id);
                if (!deletedBlog) {
                    res.status(400).send("Blog not found");
                    return;
                }
                res.status(200).send({ message: "Blog has been deleted successfully", data: deletedBlog });
            }
            catch (e) {
                console.log(e);
                res.status(500).send("Internal server error");
            }
        });
    }
}
exports.default = BlogController;
//# sourceMappingURL=blogController.js.map