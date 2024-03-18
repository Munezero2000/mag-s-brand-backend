"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const admin_1 = __importDefault(require("../middlewares/admin"));
const blogController_1 = __importDefault(require("../controllers/blogController"));
const upload_1 = __importDefault(require("../middlewares/upload"));
const router = express_1.default.Router();
// Route for getting all blogs
router.get('/', blogController_1.default.gettAllBogs);
// Route for getting a blog by ID
router.get('/:id', blogController_1.default.getBlog);
// Route for creating a new blog
router.post("/", [auth_1.default, admin_1.default, upload_1.default.single("thumbnail")], blogController_1.default.createBlog);
router.put('/:id', [auth_1.default, admin_1.default, upload_1.default.single("thumbnail")], blogController_1.default.updateBlog);
// a route to delete blogs
router.delete('/:id', [auth_1.default, admin_1.default], blogController_1.default.deleteBlog);
exports.default = router;
//# sourceMappingURL=blogRoutes.js.map