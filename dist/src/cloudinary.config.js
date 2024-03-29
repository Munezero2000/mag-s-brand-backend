"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { cloud_name, api_key, api_key_secret } = process.env;
cloudinary_1.v2.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_key_secret
});
exports.default = cloudinary_1.v2;
//# sourceMappingURL=cloudinary.config.js.map