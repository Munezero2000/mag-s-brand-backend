"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMessageObject = exports.Message = void 0;
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
// Define the Mongoose schema for the Message model
const messageSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    senderEmail: { type: String, required: true },
    content: { type: String, required: true },
    dateSent: { type: Date, default: Date.now }
});
// Define and export the Message model
exports.Message = (0, mongoose_1.model)('Message', messageSchema);
// Define Joi validation schema for Message object
const validateMessageObject = (message) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().max(100).required(),
        senderEmail: joi_1.default.string().email().required(),
        content: joi_1.default.string().min(5).max(1024).required(),
        dateSent: joi_1.default.date().optional()
    });
    return schema.validate(message);
};
exports.validateMessageObject = validateMessageObject;
//# sourceMappingURL=message.js.map