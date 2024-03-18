"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSubscriberObject = exports.Subscriber = void 0;
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
// Define the Mongoose schema for the Subscriber model
const subscriberSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    status: { type: String, enum: ["active", "deactived"], default: "active" }
});
// Define and export the Subscriber model
exports.Subscriber = (0, mongoose_1.model)('Subscriber', subscriberSchema);
// Define Joi validation schema for Subscriber object
const validateSubscriberObject = (subscriber) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
        status: joi_1.default.string().optional()
    });
    return schema.validate(subscriber);
};
exports.validateSubscriberObject = validateSubscriberObject;
//# sourceMappingURL=subscriber.js.map