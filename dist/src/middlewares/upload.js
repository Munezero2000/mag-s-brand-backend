"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandle = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: "./uploads",
    filename: (req, file, callback) => {
        return callback(null, `${file.fieldname}_${Date.now()}${path_1.default.extname(file.originalname)}`);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
// Handling Multer errors
function errorHandle(err, req, res, next) {
    if (err instanceof multer_1.default.MulterError) {
        res.status(400).json({ ok: false, message: err.message });
    }
}
exports.errorHandle = errorHandle;
exports.default = upload;
//# sourceMappingURL=upload.js.map