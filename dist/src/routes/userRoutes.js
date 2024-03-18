"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = __importDefault(require("../controllers/userController"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const admin_1 = __importDefault(require("../middlewares/admin"));
const express_1 = require("express");
const upload_1 = __importDefault(require("../middlewares/upload"));
const router = (0, express_1.Router)();
// Route for getting getting all user
router.get('/', [auth_1.default, admin_1.default], userController_1.default.getUsers);
// Route for creating new user
router.post("/", upload_1.default.single("profile"), userController_1.default.registerUser);
// a route for getting the user  by id
router.get('/:id', userController_1.default.getUserById);
router.put('/:id', upload_1.default.single("profile"), auth_1.default, userController_1.default.updateUserInfo);
// an route for deleting the user
router.delete('/:id', auth_1.default, userController_1.default.deleteUserInfo);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map