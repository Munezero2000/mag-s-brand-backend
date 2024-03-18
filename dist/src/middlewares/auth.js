"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secretKey = process.env.SECRET_KEY;
function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: "No Token Provided" });
    }
    try {
        // Verify the token
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        req.user = decoded.id;
        next();
    }
    catch (e) {
        console.error(e);
        return res.status(401).json({ msg: "Invalid Token" });
    }
}
exports.default = auth;
//# sourceMappingURL=auth.js.map