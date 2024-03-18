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
exports.validateSignIn = exports.validateUserObject = exports.User = exports.generateAuthToken = void 0;
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Mongoose  schema for user with validation rules and methods
const userSchema = new mongoose_1.Schema({
    username: { type: String, minlength: 3, maxlength: 255, required: true },
    email: { type: String, maxlength: 100, required: true },
    password: { type: String, minlength: 8, maxlength: 255, required: true },
    profile: { type: String, default: "" },
    role: { type: String, enum: ['admin', 'author', 'reader'], maxlength: 20, default: "reader", }
}, {
    timestamps: true
});
userSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, 12);
    });
});
// a method to generate token when user after authentication
function generateAuthToken(id) {
    if (!process.env.SECRET_KEY) {
        throw new Error('SECRET_KEY environment variable not set');
    }
    const secretKey = process.env.SECRET_KEY;
    return jsonwebtoken_1.default.sign({ id }, secretKey, { expiresIn: '1d' });
}
exports.generateAuthToken = generateAuthToken;
;
// user model for mongoose interation  with MongoDB
exports.User = (0, mongoose_1.model)('User', userSchema);
//  function to validate user object from request body
const validateUserObject = (user) => {
    const schema = joi_1.default.object({
        username: joi_1.default.string().min(3).max(255).required(),
        email: joi_1.default.string().email().max(100).required(),
        password: joi_1.default.string().min(5).max(255).required(),
        profile: joi_1.default.string().optional(),
        role: joi_1.default.string().max(20).optional(),
    });
    return schema.validate(user);
};
exports.validateUserObject = validateUserObject;
function validateSignIn(user) {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(5).max(255).required(),
    });
    return schema.validate(user);
}
exports.validateSignIn = validateSignIn;
//# sourceMappingURL=user.js.map