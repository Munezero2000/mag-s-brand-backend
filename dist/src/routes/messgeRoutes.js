"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageController_1 = __importDefault(require("../controllers/messageController"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const admin_1 = __importDefault(require("../middlewares/admin"));
const router = express_1.default.Router();
// Create a new message
router.post('/', messageController_1.default.createMessage);
// Retrieve all messages
router.get('/', [auth_1.default, admin_1.default], messageController_1.default.getAllMessages);
// Retrieve a single message by ID
router.get('/:id', [auth_1.default, admin_1.default], messageController_1.default.getMessageById);
// Update a message
router.put('/:id', [auth_1.default, admin_1.default], messageController_1.default.updateMessage);
// Delete a message
router.delete('/:id', [auth_1.default, admin_1.default], messageController_1.default.deleteMessage);
exports.default = router;
//# sourceMappingURL=messgeRoutes.js.map