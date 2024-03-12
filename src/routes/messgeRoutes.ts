import express from 'express';
import MessageController from '../controllers/messageController';
import auth from '../middlewares/auth';
import admin from '../middlewares/admin';
const router = express.Router();

// Create a new message
router.post('/', MessageController.createMessage);

// Retrieve all messages
router.get('/',[auth, admin], MessageController.getAllMessages);

// Retrieve a single message by ID
router.get('/:id',[auth, admin], MessageController.getMessageById);

// Update a message
router.put('/:id',[auth, admin], MessageController.updateMessage);

// Delete a message
router.delete('/messages/:id',[auth, admin], MessageController.deleteMessage);

export default router;
