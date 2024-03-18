"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
require("winston-mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const swaggerui = __importStar(require("swagger-ui-express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const blogRoutes_1 = __importDefault(require("./routes/blogRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const subsribeRoutes_1 = __importDefault(require("./routes/subsribeRoutes"));
const commentRoutes_1 = __importDefault(require("./routes/commentRoutes"));
const messgeRoutes_1 = __importDefault(require("./routes/messgeRoutes"));
const swaggerdocs_1 = __importDefault(require("./docs/swaggerdocs"));
//getting env variables
dotenv_1.default.config();
const { mongo_url, mongo_url_test, PORT } = process.env;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.use('/api/users', userRoutes_1.default);
app.use('/api/blogs', blogRoutes_1.default);
app.use('/api/auth', authRoutes_1.default);
app.use('/api/comments', commentRoutes_1.default);
app.use('/api/messages', messgeRoutes_1.default);
app.use("api/subscribe", subsribeRoutes_1.default);
app.use("/api/docs", swaggerui.serve, swaggerui.setup(swaggerdocs_1.default));
app.use('/uploads', express_1.default.static('uploads'));
mongoose_1.default.connect(mongo_url).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => console.log("error: ", error));
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
module.exports = server;
//# sourceMappingURL=server.js.map