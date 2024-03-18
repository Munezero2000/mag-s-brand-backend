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
const messageServices_1 = __importDefault(require("../services/messageServices"));
class MessageController {
    // Create a new message
    static createMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const message = yield messageServices_1.default.createMessage(req.body);
                res.status(201).send({ message: "Thank you for contacting me!" });
            }
            catch (error) {
                res.status(400).send({ error: error.message });
            }
        });
    }
    // Retrieve all messages
    static getAllMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield messageServices_1.default.getAllMessages();
                res.status(200).json(messages);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    // Retrieve a single message by ID
    static getMessageById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messageId = req.params.id;
                const message = yield messageServices_1.default.getMessageById(messageId);
                if (!message) {
                    res.status(404).json({ message: 'Message not found' });
                    return;
                }
                res.status(200).json(message);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    // Update a message
    static updateMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messageId = req.params.id;
                const updatedMessage = yield messageServices_1.default.updateMessage(messageId, req.body);
                if (!updatedMessage) {
                    res.status(404).json({ message: 'Message not found' });
                    return;
                }
                res.json(updatedMessage);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    // Delete a message
    static deleteMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messageId = req.params.id;
                const deletedMessage = yield messageServices_1.default.deleteMessage(messageId);
                if (!deletedMessage) {
                    res.status(404).send({ message: 'Message not found' });
                    return;
                }
                res.status(200).send({ message: "Message deleted successfully" });
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.default = MessageController;
//# sourceMappingURL=messageController.js.map