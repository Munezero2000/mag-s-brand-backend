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
const mongoose_1 = __importDefault(require("mongoose"));
const cloudinary_config_1 = __importDefault(require("../cloudinary.config"));
class UserController {
    static getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userService_1.default.getAllUsers();
                if (!users) {
                    res.status(404).send("No users found");
                    return;
                }
                res.status(200).send({ usersCount: users.length, users: users });
            }
            catch (e) {
                console.log(e);
                res.status(500).send("Internal server error");
            }
        });
    }
    static registerUser(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = (0, user_1.validateUserObject)(req.body);
                if (error) {
                    res.status(400).send(error.details[0].message); // Return error message if validation fails
                    return;
                }
                let profile = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) || 'defaultProfile.png';
                const { username, email, password, role } = req.body;
                // check if email has been used
                const theUser = yield userService_1.default.findUserByEmail(email);
                if (theUser) {
                    res.status(400).send({ message: "Email has been taken" });
                    return;
                }
                // save the user to the database
                const user = yield userService_1.default.createUser(username, email, password, role, profile);
                if (!user) {
                    res.status(400).send({ message: "Account not created" });
                    return;
                }
                // Send the created user object back
                res.status(201).send({ message: "Account created successfully", createdUser: user });
            }
            catch (error) {
                console.error("Error creating user:", error);
                res.status(500).send("Internal Server Error");
            }
        });
    }
    static getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                if (!id || !mongoose_1.default.isValidObjectId(id)) {
                    res.status(400).send("an user id is required");
                    return;
                }
                const user = yield userService_1.default.findUserById(id);
                if (!user) {
                    res.status(404).send("user not found");
                    return;
                }
                res.status(200).send(user);
            }
            catch (e) {
                console.log(e);
                res.status(500).send("Internal server error");
            }
        });
    }
    static updateUserInfo(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                // checking if the id is given
                if (!id || !mongoose_1.default.isValidObjectId(id)) {
                    res.status(400).send("a valid user id is required");
                    return;
                }
                const uploadResult = yield cloudinary_config_1.default.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
                let profile = uploadResult.secure_url || "defaultProfile";
                let { username, email, password, role } = req.body;
                if (password) {
                    password = yield bcrypt_1.default.hash(password, 12);
                }
                const theUser = { username, email, password, role, profile };
                // updating the user if the id is valid and 
                const updatedUser = yield userService_1.default.findUserByIdAndUpdate(id, theUser);
                if (!updatedUser) {
                    res.status(404).send("user not found");
                    return;
                }
                res.status(200).send(updatedUser);
            }
            catch (e) {
                console.log(e);
                res.status(500).send("Internal server error");
            }
        });
    }
    static deleteUserInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                // checking if the id is given
                if (!id || !mongoose_1.default.isValidObjectId(id)) {
                    res.status(400).send("a user id is required");
                    return;
                }
                // Deleting the user from the database
                const deletedUser = yield userService_1.default.findUserByIdAndDelete(id);
                if (!deletedUser) {
                    res.status(404).send("user not found");
                    return;
                }
                res.status(200).send({ message: "User had been deleted successfully", data: deletedUser });
            }
            catch (e) {
                console.log(e);
                res.status(500).send("Internal server error");
            }
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=userController.js.map