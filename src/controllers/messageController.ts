import { Request, Response } from 'express';
import MessageService from '../services/messageServices';

export default class MessageController {
    // Create a new message
    static async createMessage(req: Request, res: Response): Promise<void> {
        try {
            const message = await MessageService.createMessage(req.body);
            res.status(201).send({message:"Thank you for contacting me!"});
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    }

    // Retrieve all messages
    static async getAllMessages(req: Request, res: Response): Promise<void> {
        try {
            const messages = await MessageService.getAllMessages();
            res.status(200).json(messages);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    // Retrieve a single message by ID
    static async getMessageById(req: Request, res: Response): Promise<void> {
        try {
            const messageId = req.params.id;
            const message = await MessageService.getMessageById(messageId);
            if (!message) {
                res.status(404).json({ message: 'Message not found' });
                return;
            }
            res.status(200).json(message);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    // Update a message
    static async updateMessage(req: Request, res: Response): Promise<void> {
        try {
            const messageId = req.params.id;
            const updatedMessage = await MessageService.updateMessage(messageId, req.body);
            if (!updatedMessage) {
                res.status(404).json({ message: 'Message not found' });
                return;
            }
            res.json(updatedMessage);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    // Delete a message
    static async deleteMessage(req: Request, res: Response): Promise<void> {
        try {
            const messageId = req.params.id;
            const deletedMessage = await MessageService.deleteMessage(messageId);
            if (!deletedMessage) {
                res.status(404).send({ message: 'Message not found' });
                return;
            }
            res.status(200).send({message:"Message deleted successfully"});
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}