import express from 'express';
import MessageController from '../controllers/messageController';
const router = express.Router();

// Create a new message
router.post('/messages', MessageController.createMessage);

// Retrieve all messages
router.get('/messages', MessageController.getAllMessages);

// Retrieve a single message by ID
router.get('/messages/:id', MessageController.getMessageById);

// Update a message
router.put('/messages/:id', MessageController.updateMessage);

// Delete a message
router.delete('/messages/:id', MessageController.deleteMessage);

export default router;
