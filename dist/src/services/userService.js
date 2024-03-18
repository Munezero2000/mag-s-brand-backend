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
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
class UserService {
    // a method to create new user
    static createUser(username, email, password, role, profile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!username || !email || !password) {
                    throw new Error("Invalid user data");
                }
                const user = new user_1.User({ username, email, password, role, profile });
                return yield user.save();
            }
            catch (error) {
                console.log("Error creating blog: ", error);
                return null;
            }
        });
    }
    // a method to get all users
    static findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.User.findOne({ email });
                return user;
            }
            catch (e) {
                console.log(e);
                return null;
            }
        });
    }
    // a method to update user information
    static findUserByIdAndUpdate(id, theUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.User.findByIdAndUpdate(id, theUser, { new: true });
                return user;
            }
            catch (e) {
                console.log(e);
                return null;
            }
        });
    }
    // a method to delete user
    static findUserByIdAndDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.User.findByIdAndDelete(id);
                return user;
            }
            catch (e) {
                console.log(e);
                return null;
            }
        });
    }
    static findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.User.findById(id);
                return user;
            }
            catch (e) {
                console.log(e);
                return null;
            }
        });
    }
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_1.User.find().select("-password");
                return users;
            }
            catch (error) {
                console.log("Error creating blog: ", error);
                return null;
            }
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=userService.js.map