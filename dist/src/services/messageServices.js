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
const message_1 = require("../models/message");
class MessageService {
    // Create a new message
    static createMessage(messageData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = (0, message_1.validateMessageObject)(messageData);
            if (error)
                throw new Error(error.details[0].message);
            const message = new message_1.Message(messageData);
            return yield message.save();
        });
    }
    // Retrieve all messages
    static getAllMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield message_1.Message.find();
        });
    }
    // Retrieve a single message by ID
    static getMessageById(messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield message_1.Message.findById(messageId);
        });
    }
    // Update a message
    static updateMessage(messageId, messageData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = (0, message_1.validateMessageObject)(messageData);
            if (error)
                throw new Error(error.details[0].message);
            return yield message_1.Message.findByIdAndUpdate(messageId, messageData, { new: true });
        });
    }
    // Delete a message
    static deleteMessage(messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield message_1.Message.findByIdAndDelete(messageId);
        });
    }
}
exports.default = MessageService;
//# sourceMappingURL=messageServices.js.map