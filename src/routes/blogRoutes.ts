import express from "express";
import { validateBlogObject, IBlog } from "../models/blog"; 
import BlogService from "../services/blogServices"; 

const router = express.Router();

// Route for getting all blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await BlogService.getAllBlogs();
        if (!blogs) {
            res.status(400).send("No blogs found");
            return;
        }
        res.status(200).send({ blogsCount: blogs.length, blogs: blogs });
    } catch (e) {
        console.log(e)
        res.status(500).send("Internal server error")
    }
})

// Route for creating a new blog
router.post("/", async (req, res) => {
    try {
        const { error } = validateBlogObject(req.body);
        if (error) {
            res.status(400).send(error.details[0].message); // Return error message if validation fails
            return;
        }

        const { title, content, author, category, status, thumbnail } = req.body;
        // Save the blog to the database
        const blog: IBlog | null = await BlogService.createBlog(title, content, author, category, status);
        if (!blog) {
            res.status(400).send({ message: "Blog not created" });
            return;
        }

        // Send the created blog object back
        res.status(201).send({ message: "Blog created successfully", createdBlog: blog });
    } catch (error) {
        console.error("Error creating blog:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Route for getting a blog by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            res.status(400).send("A blog ID is required");
            return;
        }

        const blog = await BlogService.getBlogById(id);
        if (!blog) {
            res.status(400).send("Blog not found");
            return;
        }
        res.status(200).send(blog);
    } catch (e) {
        console.log(e)
        res.status(500).send("Internal server error")
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            res.status(400).send("A blog ID is required");
            return;
        }

        const { error } = validateBlogObject(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }

        const { title, content, author, category, status, thumbnail } = req.body;
        const updatedBlog: IBlog = { title, content, author, category, status, thumbnail};

        const updatedBlogResult = await BlogService.updateBlogById(id, updatedBlog);
        if (!updatedBlogResult) {
            res.status(400).send("Blog not found");
            return;
        }
        res.status(200).send(updatedBlogResult);
    } catch (e) {
        console.log(e)
        res.status(500).send("Internal server error")
    }
})

// a route to delete blogs
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            res.status(400).send("A blog ID is required");
            return;
        }

        const deletedBlog = await BlogService.deleteBlogById(id);
        if (!deletedBlog) {
            res.status(400).send("Blog not found");
            return;
        }
        res.status(200).send({ message: "Blog has been deleted successfully", data: deletedBlog });
    } catch (e) {
        console.log(e)
        res.status(500).send("Internal server error")
    }
})

export default router;
