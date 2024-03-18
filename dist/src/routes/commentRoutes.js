"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const commentController_1 = __importDefault(require("../controllers/commentController"));
const router = express_1.default.Router();
// Route for creating a new comment on a specific blog
router.post("/", auth_1.default, commentController_1.default.createComment);
// Route for getting all comments on a specific blog
router.get('/:blogId', commentController_1.default.getBlogComments);
// Route for getting a comment by ID on a specific blog
router.get('/:blogId/:commentId', auth_1.default, commentController_1.default.getBlogCommentById);
// Route for updating a comment by ID on a specific blog
router.put('/:blogId/:commentId', auth_1.default, commentController_1.default.updateBlogComment);
// Route for deleting a comment by ID on a specific blog
router.delete('/:blogId/:commentId', auth_1.default, commentController_1.default.deleteBlogComment);
exports.default = router;
//# sourceMappingURL=commentRoutes.js.map