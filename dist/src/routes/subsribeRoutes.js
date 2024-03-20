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
const express_1 = require("express");
const subscriber_1 = require("../models/subscriber");
const auth_1 = __importDefault(require("../middlewares/auth"));
const admin_1 = __importDefault(require("../middlewares/admin"));
const router = (0, express_1.Router)();
router.get('/subscribers', [auth_1.default, admin_1.default], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subscribers = yield subscriber_1.Subscriber.find();
        res.status(200).send(subscribers);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
router.post('/subscribers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        // Check if the email already exists
        const existingSubscriber = yield subscriber_1.Subscriber.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        // Create a new subscriber
        const newSubscriber = new subscriber_1.Subscriber({ email });
        yield newSubscriber.save();
        res.status(201).json(newSubscriber);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}));
// Route to delete a subscriber by ID
router.delete('/subscribers/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subscriber = yield subscriber_1.Subscriber.findById(req.params.id);
        if (subscriber == null) {
            return res.status(404).json({ message: 'Subscriber not found' });
        }
        yield subscriber.deleteOne();
        res.json({ message: 'Subscriber deleted' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// Route to update the status of a subscriber by ID
router.patch('/subscribers/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subscriber = yield subscriber_1.Subscriber.findById(req.params.id);
        if (subscriber == null) {
            return res.status(404).json({ message: 'Subscriber not found' });
        }
        if (req.body.status != null) {
            subscriber.status = req.body.status;
        }
        yield subscriber.save();
        res.json(subscriber);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
exports.default = router;
//# sourceMappingURL=subsribeRoutes.js.map