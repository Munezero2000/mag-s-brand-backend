import { Schema, model } from "mongoose";
import Joi from "joi";

// Define the Subscriber interface
export interface ISubscriber {
    _id?: string;
    email: string;
}

// Define the Mongoose schema for the Subscriber model
const subscriberSchema: Schema<ISubscriber> = new Schema<ISubscriber>({
    email: { type: String, required: true, unique: true }
});

// Define and export the Subscriber model
export const Subscriber = model<ISubscriber>('Subscriber', subscriberSchema);

// Define Joi validation schema for Subscriber object
export const validateSubscriberObject = (subscriber: ISubscriber) => {
    const schema = Joi.object({
        email: Joi.string().email().required()
    });

    return schema.validate(subscriber);
};
