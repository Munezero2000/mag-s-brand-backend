"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCommentObject = exports.Comment = void 0;
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
const commentSchema = new mongoose_1.Schema({
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    blog: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Blog', required: true },
    content: { type: String, required: true },
}, {
    timestamps: true
});
exports.Comment = (0, mongoose_1.model)('Comment', commentSchema);
const validateCommentObject = (comment) => {
    const schema = joi_1.default.object({
        author: joi_1.default.string().required(),
        blog: joi_1.default.string().required(),
        content: joi_1.default.string().required().min(9)
    });
    return schema.validate(comment);
};
exports.validateCommentObject = validateCommentObject;
//# sourceMappingURL=comment.js.map