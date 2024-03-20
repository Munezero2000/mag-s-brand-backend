import request from 'supertest';
import { Blog } from "../../../models/blog";
import { User, generateAuthToken } from '../../../models/user';


let server: any;
let token:any;
describe("/api/blogs", () => {
    beforeEach(async() => {
        server = require('../../../server');
        const user = new User({ username: "Munezero", email: "munezero@gmail.com", password: "Mune@123", role: "admin" });
        await user.save();
        token= generateAuthToken(user._id);
        
      });
    
      afterEach(async () => {
        await server.close();
        await Blog.deleteMany({});
        await User.deleteMany({});
      });

    // Testing all Get end points
    describe('GET /', () => {
        it("Should return number of blogs, a list of blogs and status of 200", async () => {
            const blogs = await Blog.insertMany([{ title: "How to drink water", content: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest", author: "65e0840020670ff2c5f7e264", category: "technology", status: "published" }, { title: "How to drink water", content: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest", author: "65e0840020670ff2c5f7e264", category: "technology", status: "published" }])
            const res = await request(server).get("/api/blogs");
            expect(res.status).toBe(200);
        })
    })

    describe('GET /:id', () => {
        it("Should return a blog and status of 200 if the id is valid", async () => {
            const blog = new Blog({ title: "How to drink water", content: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest", author: "65e0840020670ff2c5f7e264", category: "technology", status: "published" });
            await blog.save();
            const res = await request(server).get("/api/blogs/"+ blog._id);
            expect(res.status).toBe(200);
        })
        it("Should return 404 if an invalid id is given", async () => {
            const res = await request(server).get("/api/blogs/1");
            expect(res.status).toBe(404);
        })
    })

    describe('POST /', () => {

        it("Should return a 201 a blog is created", async () => {
            const blog = { title: "How to create a new blog in here", content: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest", author: "65e0840020670ff2c5f7e264", category: "technology", status: "published" };
            const res = await request(server).post("/api/blogs/").set("x-auth-token", token).send(blog);
            console.log(res)
            expect(res.status).toBe(201);
        })
        
        it("Should return a 400 if invalid inputs are provided", async () => {
            const blog = { title: "", content: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest", author: "65e0840020670ff2c5f7e264", category: "technology", status: "published" };
            const res = await request(server).post("/api/blogs/").set("x-auth-token", token).send(blog);
            expect(res.status).toBe(400);
        })
    })

    describe('PUT /:id', () => {

        it("Should return a 400 if an invalid id is given", async () => {
            const res = await request(server).put("/api/blogs/1").set("x-auth-token", token);
            expect(res.status).toBe(400);
        });
    
        it("Should return a 400 if invalid inputs are provided", async () => {
            const blog = new Blog({ title: "How to drink water", content: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest", author: "65e0840020670ff2c5f7e264", category: "technology", status: "published" });
            await blog.save();
            const res = await request(server).put("/api/blogs/" + blog._id).set("x-auth-token", token).send({ title: "", content: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest" });
            expect(res.status).toBe(400);
        });
    
        it("Should return a 404 if the blog with the given id is not found", async () => {
            const res = await request(server).put("/api/blogs/123456789012345678901234").set("x-auth-token", token).send({ title: "How to drink water", content: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest", author: "65e0840020670ff2c5f7e264", category: "technology", status: "published" });
            expect(res.status).toBe(404);
        });
    
        it("Should return the updated blog if valid inputs are provided", async () => {
            const blog = new Blog({ title: "How to drink water", content: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest", author: "65e0840020670ff2c5f7e264", category: "technology", status: "published" });
            await blog.save();
            let updateBlog = { title: "How to drink enough water daily", content: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest", author: "65e0840020670ff2c5f7e264", category: "technology", status: "published" }
            const res = await request(server).put("/api/blogs/" + blog._id).set("x-auth-token", token).send(updateBlog);
            expect(res.status).toBe(200);
        });
    });
    
    describe('DELETE /:id', () => {
        it("Should return a 400 if an invalid id is given", async () => {
            const res = await request(server).delete("/api/blogs/1").set("x-auth-token", token);
            expect(res.status).toBe(400);
        });
    
        it("Should return a 404 if the blog with the given id is not found", async () => {
            const res = await request(server).delete("/api/blogs/123456789012345678901234").set("x-auth-token", token);
            expect(res.status).toBe(404);
        });
    
        it("Should return the deleted blog if valid id is provided", async () => {
            const blog = new Blog({ title: "How to drink water", content: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest", author: "65e0840020670ff2c5f7e264", category: "technology", status: "published" });
            await blog.save();
            const res = await request(server).delete("/api/blogs/" + blog._id).set("x-auth-token", token);
            expect(res.status).toBe(200);
        });
    });
    
});