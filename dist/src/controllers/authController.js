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
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userService_1 = __importDefault(require("../services/userService"));
class AuthController {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = (0, user_1.validateSignIn)(req.body);
            if (error)
                return res.status(400).send(error.details[0].message);
            // finding user by email
            const { email, password } = req.body;
            let user = yield userService_1.default.findUserByEmail(email);
            if (!user)
                return res.status(400).send("Invalid email");
            const validPassword = yield bcrypt_1.default.compare(password, user.password);
            if (!validPassword)
                return res.status(400).send("Invalid password");
            const token = (0, user_1.generateAuthToken)(user._id);
            res.header("Access-Control-Expose-Headers", "x-auth-token");
            res
                .header("x-auth-token", token)
                .send({ _id: user._id, name: user.username, email: user.email, role: user.role });
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=authController.js.map