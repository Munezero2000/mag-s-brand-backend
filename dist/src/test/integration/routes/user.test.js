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
const user_1 = require("../../../models/user");
let server;
describe('api/users', () => {
    beforeEach(() => {
        server = require('../../../server');
    });
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        server.close();
        yield user_1.User.deleteMany({});
    }));
    // testing Get end point
    describe('GET /', () => {
        it('should return 401 if the user is unauthorized or not authenticated', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(server).get('/api/users');
            expect(res.status).toBe(401);
        }));
        it('should return a list of users (200) if the authenticated user is authorized', () => __awaiter(void 0, void 0, void 0, function* () {
            const users = yield user_1.User.insertMany([{ username: "Munezero", email: "munezero@gmail.com", password: "Mune@123", role: "admin" }, { username: "Mune", email: "mune@gmail.com", password: "Mune@123", role: "reader" }]);
            const token = (0, user_1.generateAuthToken)(users[0]._id);
            const res = yield (0, supertest_1.default)(server).get('/api/users').set('x-auth-token', token);
            expect(res.status).toBe(200);
        }));
    });
    //  Testing Get '/:id' route handler
    describe("GET /:id", () => {
        it("should returns 404 when the id is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
            const user = new user_1.User({ username: "Munezero", email: "munezero@gmail.com", password: "Mune@123", role: "admin" });
            yield user.save();
            const token = (0, user_1.generateAuthToken)(user._id);
            const res = yield (0, supertest_1.default)(server)
                .get("/api/users/1")
                .set("x-auth-token", token);
            expect(res.status).toBe(400);
        }));
        it("should return the user object with the given id", () => __awaiter(void 0, void 0, void 0, function* () {
            const user = new user_1.User({ username: "Munezero", email: "munezero@gmail.com", password: "Mune@123", role: "admin" });
            yield user.save();
            const res = yield (0, supertest_1.default)(server).get("/api/users/" + user._id);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('email', user.email);
        }));
    });
    // testing users update end points
    describe('PUT /:id', () => {
        it("should return 400 if the user id is missing", () => __awaiter(void 0, void 0, void 0, function* () {
            const user = new user_1.User({ username: "test", email: 'test', password: 'password@123', role: "reader" });
            yield user.save();
            const token = (0, user_1.generateAuthToken)(user._id);
            const res = yield (0, supertest_1.default)(server)
                .put('/api/users/1')
                .set('x-auth-token', token)
                .send({ username: "test", email: 'test', password: 'password@123', role: "admin" });
            expect(res.status).toBe(400);
        }));
        it("should return 400 if the user id is invalid or not a valid mongoose id", () => __awaiter(void 0, void 0, void 0, function* () {
            const user = new user_1.User({ username: "test", email: 'test', password: 'password@123', role: "reader" });
            yield user.save();
            const token = (0, user_1.generateAuthToken)(user._id);
            const res = yield (0, supertest_1.default)(server).put('/api/users/:1').set('x-auth-token', token).send({ username: "test username", email: 'test@gmail.com', password: 'password@123', role: "reader" });
            expect(res.status).toBe(400);
        }));
        it("should return 400 if data provided are invalid", () => __awaiter(void 0, void 0, void 0, function* () {
            const user = new user_1.User({ username: "test", email: 'test', password: 'password@123', role: "reader" });
            yield user.save();
            const token = (0, user_1.generateAuthToken)(user._id);
            const res = yield (0, supertest_1.default)(server).put('/api/users/' + user._id)
                .set('x-auth-token', token)
                .send({ username: "test", email: 'test', password: 'password@123', role: "admin" });
            expect(res.status).toBe(400);
        }));
        it("should return 404 if the user does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
            const user = new user_1.User({ username: "test", email: 'test', password: 'password@123', role: "reader" });
            yield user.save();
            const token = (0, user_1.generateAuthToken)(user._id);
            const res = yield (0, supertest_1.default)(server)
                .put('/api/users/609e9c5c9e192d0015c37495')
                .set("x-auth-token", token)
                .send({ username: "test username", email: 'test@gmail.com', password: 'password@123', role: "reader" });
            expect(res.status).toBe(404);
        }));
        it("should update user info and return updated user object with 200 status code", () => __awaiter(void 0, void 0, void 0, function* () {
            const user = new user_1.User({ username: "test", email: 'test', password: 'password@123', role: "reader" });
            yield user.save();
            const token = (0, user_1.generateAuthToken)(user._id);
            const updatedData = { username: "updated username", email: 'updated@test.com', password: 'updatedpassword@123', role: "admin" };
            const res = yield (0, supertest_1.default)(server).put('/api/users/' + user._id)
                .set('x-auth-token', token)
                .send(updatedData);
            expect(res.status).toBe(200);
            expect(res.body.username).toBe(updatedData.username);
            expect(res.body.email).toBe(updatedData.email);
            expect(res.body.password).toBe(updatedData.password); // Assuming password update is allowed
            expect(res.body.role).toBe(updatedData.role);
        }));
    });
    // Delete test for user
    describe('DELETE /:id', () => {
        it('should return 400 if the user id is missing', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = new user_1.User({ username: "test", email: 'test@test.com', password: 'password@123', role: "reader" });
            yield user.save();
            const token = (0, user_1.generateAuthToken)(user._id);
            const res = yield (0, supertest_1.default)(server)
                .delete('/api/users/1')
                .set('x-auth-token', token);
            expect(res.status).toBe(400);
        }));
        it('should return 404 if the user does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = new user_1.User({ username: "test", email: 'test@test.com', password: 'password@123', role: "reader" });
            yield user.save();
            const token = (0, user_1.generateAuthToken)(user._id);
            const res = yield (0, supertest_1.default)(server)
                .delete('/api/users/609e9c5c9e192d0015c37495')
                .set('x-auth-token', token);
            expect(res.status).toBe(404);
        }));
        it('should delete the user and return 200 if successful', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = new user_1.User({ username: "test", email: 'test@test.com', password: 'password@123', role: "reader" });
            yield user.save();
            const token = (0, user_1.generateAuthToken)(user._id);
            const res = yield (0, supertest_1.default)(server)
                .delete('/api/users/' + user._id)
                .set("x-auth-token", token);
            expect(res.status).toBe(200);
            expect(res.body.message).toBe("User had been deleted successfully");
        }));
    });
});
//# sourceMappingURL=user.test.js.map