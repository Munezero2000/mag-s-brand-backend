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
const supertest_1 = __importDefault(require("supertest"));
const comment_1 = require("../../../models/comment");
const user_1 = require("../../../models/user");
const blog_1 = require("../../../models/blog");
let server;
describe("/api/comments", () => {
    beforeEach(() => {
        server = require('../../../server');
    });
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        server.close();
        yield comment_1.Comment.deleteMany({});
        yield user_1.User.deleteMany({});
        yield blog_1.Blog.deleteMany({});
    }));
    describe('POST /api/blogs/:blogId/comments', () => {
        it("Should return a 400 if invalid inputs are provided", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(server).post("/api/blogs/123/comments").send({ author: "", content: "test comment" });
            expect(res.status).toBe(400);
        }));
        it("Should return a 201 if valid inputs are provided", () => __awaiter(void 0, void 0, void 0, function* () {
            const user = new user_1.User({ username: "testuser", email: "testuser@example.com", password: "testpassword" });
            yield user.save();
            const blog = new blog_1.Blog({ title: "Test Blog", content: "This is a test blog", author: user._id });
            yield blog.save();
            const token = (0, user_1.generateAuthToken)(user._id);
            const res = yield (0, supertest_1.default)(server).post(`/api/blogs/${blog._id}/comments`).set("x-auth-token", token).send({ author: user._id, content: "test comment" });
            expect(res.status).toBe(201);
            expect(res.body.createdComment.author).toBe(user._id.toString());
        }));
    });
    describe('GET /api/blogs/:blogId/comments', () => {
        it("Should return a 400 if invalid blog ID is provided", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(server).get("/api/blogs/123/comments");
            expect(res.status).toBe(400);
        }));
        it("Should return a 200 if valid blog ID is provided", () => __awaiter(void 0, void 0, void 0, function* () {
            const user = new user_1.User({ username: "testuser", email: "testuser@example.com", password: "testpassword" });
            yield user.save();
            const blog = new blog_1.Blog({ title: "Test Blog", content: "This is a test blog", author: user._id });
            yield blog.save();
            const res = yield (0, supertest_1.default)(server).get(`/api/blogs/${blog._id}/comments`);
            expect(res.status).toBe(200);
        }));
    });
    describe('GET /api/blogs/:blogId/comments/:commentId', () => {
        it("Should return a 400 if invalid blog ID or comment ID is provided", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(server).get("/api/blogs/123/comments/456");
            expect(res.status).toBe(400);
        }));
        it("Should return a 200 if valid blog ID and comment ID is provided", () => __awaiter(void 0, void 0, void 0, function* () {
            const user = new user_1.User({ username: "testuser", email: "testuser@example.com", password: "testpassword" });
            yield user.save();
            const blog = new blog_1.Blog({ title: "Test Blog", content: "This is a test blog", author: user._id });
            yield blog.save();
            const comment = new comment_1.Comment({ author: user._id, content: "test comment", blog: blog._id });
            yield comment.save();
            const res = yield (0, supertest_1.default)(server).get(`/api/blogs/${blog._id}/comments/${comment._id}`);
            expect(res.status).toBe(200);
            expect(res.body.author).toBe(user._id.toString());
        }));
    });
    describe('PUT /api/blogs/:blogId/comments/:commentId', () => {
        it("Should return a 400 if invalid blog ID or comment ID is provided", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(server).put("/api/blogs/123/comments/456");
            expect(res.status).toBe(400);
        }));
        it("Should return a 400 if invalid inputs are provided", () => __awaiter(void 0, void 0, void 0, function* () {
            const user = new user_1.User({ username: "testuser", email: "testuser@example.com", password: "testpassword" });
            yield user.save();
            const blog = new blog_1.Blog({ title: "Test Blog", content: "This is a test blog", author: user._id });
            yield blog.save();
            const comment = new comment_1.Comment({ author: user._id, content: "test comment", blog: blog._id });
            yield comment.save();
            const res = yield (0, supertest_1.default)(server).put(`/api/blogs/${blog._id}/comments/${comment._id}`).send({ author: "", content: "updated comment" });
            expect(res.status).toBe(400);
        }));
        it("Should return a 200 if valid inputs are provided", () => __awaiter(void 0, void 0, void 0, function* () {
            const user = new user_1.User({ username: "testuser", email: "testuser@example.com", password: "testpassword" });
            yield user.save();
            const blog = new blog_1.Blog({ title: "Test Blog", content: "This is a test blog", author: user._id });
            yield blog.save();
            const comment = new comment_1.Comment({ author: user._id, content: "test comment", blog: blog._id });
            yield comment.save();
            const res = yield (0, supertest_1.default)(server).put(`/api/blogs/${blog._id}/comments/${comment._id}`).send({ author: user._id, content: "updated comment" });
            expect(res.status).toBe(200);
            expect(res.body.content).toBe("updated comment");
        }));
    });
    describe('DELETE /api/blogs/:blogId/comments/:commentId', () => {
        it("Should return a 400 if invalid blog ID or comment ID is provided", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(server).delete("/api/blogs/123/comments/456");
            expect(res.status).toBe(400);
        }));
        it("Should return a 200 if valid inputs are provided", () => __awaiter(void 0, void 0, void 0, function* () {
            const user = new user_1.User({ username: "testuser", email: "testuser@example.com", password: "testpassword" });
            yield user.save();
            const blog = new blog_1.Blog({ title: "Test Blog", content: "This is a test blog", author: user._id });
            yield blog.save();
            const comment = new comment_1.Comment({ author: user._id, content: "test comment", blog: blog._id });
            yield comment.save();
            const res = yield (0, supertest_1.default)(server).delete(`/api/blogs/${blog._id}/comments/${comment._id}`);
            expect(res.status).toBe(200);
            expect(res.body.data._id).toBe(comment._id.toString());
        }));
    });
});
//# sourceMappingURL=comment.test.js.map