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
const blog_1 = require("../../../models/blog");
const user_1 = require("../../../models/user");
let server;
let token;
describe("/api/blogs", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        server = require('../../../server');
        const user = new user_1.User({ username: "Munezero", email: "munezero@gmail.com", password: "Mune@123", role: "admin" });
        yield user.save();
        token = (0, user_1.generateAuthToken)(user._id);
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield server.close();
        yield blog_1.Blog.deleteMany({});
        yield user_1.User.deleteMany({});
    }));
    // Testing all Get end points
    describe('GET /', () => {
        it("Should return number of blogs, a list of blogs and status of 200", () => __awaiter(void 0, void 0, void 0, function* () {
            const blogs = yield blog_1.Blog.insertMany([{ title: "How to drink water", content: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest", author: "65e0840020670ff2c5f7e264", category: "technology", status: "published" }, { title: "How to drink water", content: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest", author: "65e0840020670ff2c5f7e264", category: "technology", status: "published" }]);
            const res = yield (0, supertest_1.default)(server).get("/api/blogs");
            expect(res.status).toBe(200);
        }));
    });
    describe('GET /:id', () => {
        it("Should return a blog and status of 200 if the id is valid", () => __awaiter(void 0, void 0, void 0, function* () {
            const blog = new blog_1.Blog({ title: "How to drink water", content: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest", author: "65e0840020670ff2c5f7e264", category: "technology", status: "published" });
            yield blog.save();
            const res = yield (0, supertest_1.default)(server).get("/api/blogs/" + blog._id);
            expect(res.status).toBe(200);
        }));
        it("Should return 404 if an invalid id is given", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(server).get("/api/blogs/1");
            expect(res.status).toBe(404);
        }));
    });
    describe('POST /', () => {
        it("Should return a 201 a blog is created", () => __awaiter(void 0, void 0, void 0, function* () {
            const blog = { title: "How to create a new blog in here", content: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest", author: "65e0840020670ff2c5f7e264", category: "technology", status: "published" };
            const res = yield (0, supertest_1.default)(server).post("/api/blogs/").set("x-auth-token", token).send(blog);
            console.log(res);
            expect(res.status).toBe(201);
        }));
        it("Should return a 400 if invalid inputs are provided", () => __awaiter(void 0, void 0, void 0, function* () {
            const blog = { title: "", content: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest", author: "65e0840020670ff2c5f7e264", category: "technology", status: "published" };
            const res = yield (0, supertest_1.default)(server).post("/api/blogs/").set("x-auth-token", token).send(blog);
            expect(res.status).toBe(400);
        }));
    });
    describe('PUT /:id', () => {
        it("Should return a 400 if an invalid id is given", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(server).put("/api/blogs/1").set("x-auth-token", token);
            expect(res.status).toBe(400);
        }));
        it("Should return a 400 if invalid inputs are provided", () => __awaiter(void 0, void 0, void 0, function* () {
            const blog = new blog_1.Blog({ title: "How to drink water", content: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest", author: "65e0840020670ff2c5f7e264", category: "technology", status: "published" });
            yield blog.save();
            const res = yield (0, supertest_1.default)(server).put("/api/blogs/" + blog._id).set("x-auth-token", token).send({ title: "", content: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest" });
            expect(res.status).toBe(400);
        }));
        it("Should return a 404 if the blog with the given id is not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(server).put("/api/blogs/123456789012345678901234").set("x-auth-token", token).send({ title: "How to drink water", content: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest", author: "65e0840020670ff2c5f7e264", category: "technology", status: "published" });
            expect(res.status).toBe(404);
        }));
        it("Should return the updated blog if valid inputs are provided", () => __awaiter(void 0, void 0, void 0, function* () {
            const blog = new blog_1.Blog({ title: "How to drink water", content: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest", author: "65e0840020670ff2c5f7e264", category: "technology", status: "published" });
            yield blog.save();
            let updateBlog = { title: "How to drink enough water daily", content: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest", author: "65e0840020670ff2c5f7e264", category: "technology", status: "published" };
            const res = yield (0, supertest_1.default)(server).put("/api/blogs/" + blog._id).set("x-auth-token", token).send(updateBlog);
            expect(res.status).toBe(200);
        }));
    });
    describe('DELETE /:id', () => {
        it("Should return a 400 if an invalid id is given", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(server).delete("/api/blogs/1").set("x-auth-token", token);
            expect(res.status).toBe(400);
        }));
        it("Should return a 404 if the blog with the given id is not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(server).delete("/api/blogs/123456789012345678901234").set("x-auth-token", token);
            expect(res.status).toBe(404);
        }));
        it("Should return the deleted blog if valid id is provided", () => __awaiter(void 0, void 0, void 0, function* () {
            const blog = new blog_1.Blog({ title: "How to drink water", content: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest", author: "65e0840020670ff2c5f7e264", category: "technology", status: "published" });
            yield blog.save();
            const res = yield (0, supertest_1.default)(server).delete("/api/blogs/" + blog._id).set("x-auth-token", token);
            expect(res.status).toBe(200);
        }));
    });
});
//# sourceMappingURL=blog.test.js.map