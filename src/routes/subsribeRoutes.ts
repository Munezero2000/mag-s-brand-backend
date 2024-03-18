import { Router, Request, Response} from "express";
import { Subscriber } from "../models/subscriber";
import auth from "../middlewares/auth";
import admin from "../middlewares/admin";

const router = Router();

router.get('/subscribers',[auth, admin], async (req:Request, res:Response) => {
    try {
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    } catch (err:any) {
        res.status(500).json({ message: err.message });
    }
});

// Route to delete a subscriber by ID
router.delete('/subscribers/:id', async (req, res) => {
    try {
        const subscriber = await Subscriber.findById(req.params.id);
        if (subscriber == null) {
            return res.status(404).json({ message: 'Subscriber not found' });
        }
        await subscriber.deleteOne();
        res.json({ message: 'Subscriber deleted' });
    } catch (err:any) {
        res.status(500).json({ message: err.message });
    }
});

// Route to update the status of a subscriber by ID
router.patch('/subscribers/:id', async (req, res) => {
    try {
        const subscriber = await Subscriber.findById(req.params.id);
        if (subscriber == null) {
            return res.status(404).json({ message: 'Subscriber not found' });
        }
        if (req.body.status != null) {
            subscriber.status = req.body.status;
        }
        await subscriber.save();
        res.json(subscriber);
    } catch (err:any) {
        res.status(500).json({ message: err.message });
    }
});

export default router;