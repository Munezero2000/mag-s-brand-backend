"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBlogObject = exports.Blog = void 0;
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
// creating a schema
const blogSchema = new mongoose_1.Schema({
    title: { type: String, required: true, minlength: 5 },
    content: { type: String, required: true, minlength: 50 },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, enum: ["technology", "sports", "entertainment", "health", "business", "education"], required: true },
    thumbnail: { type: String, default: "" },
    status: { type: String, enum: ["published", "archived"], default: "published" },
    likes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Comment' }],
}, {
    timestamps: true
});
exports.Blog = (0, mongoose_1.model)('Blog', blogSchema);
const validateBlogObject = (blog) => {
    const schema = joi_1.default.object({
        title: joi_1.default.string().min(3).required(),
        content: joi_1.default.string().min(50).required(),
        author: joi_1.default.string().required(),
        category: joi_1.default.string().required(),
        likes: joi_1.default.array().items(joi_1.default.string()),
        comments: joi_1.default.array().items(joi_1.default.string()),
        status: joi_1.default.string().optional(),
        thumbnail: joi_1.default.string().optional(),
    });
    return schema.validate(blog);
};
exports.validateBlogObject = validateBlogObject;
//# sourceMappingURL=blog.js.map