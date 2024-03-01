import { IBlog, Blog } from "../models/blog";

export default class BlogService {
    // Method to create a new blog post
    static async createBlog(
        title: string,
        content: string,
        author: string,
        category?: string,
        status?: string,
        thumbnail?:string
    ) {
        try {
            if (!title || !content || !author) {
                throw new Error("Invalid blog data");
            }
            const blog = new Blog({ title, content, author, category, status, thumbnail});
            return await blog.save();
        } catch (error) {
            console.log("Error creating blog: ", error)
            return null;
        }
    }

    // Method to get all blog posts
    static async getAllBlogs() {
        try {
            const blogs = await Blog.find();
            return blogs;
        } catch (error) {
            console.log("Error getting blogs: ", error)
            return null;
        }
    }

    // Method to get a blog post by ID
    static async getBlogById(id: string) {
        try {
            const blog = await Blog.findById(id);
            return blog;
        } catch (error) {
            console.log("Error getting blog by ID: ", error)
            return null;
        }
    }

    // Method to update a blog post by ID
    static async updateBlogById(id: string, updatedBlog: IBlog) {
        try {
            const blog = await Blog.findByIdAndUpdate(id, updatedBlog, { new: true });
            return blog;
        } catch (error) {
            console.log("Error updating blog by ID: ", error)
            return null;
        }
    }

    // Method to delete a blog post by ID
    static async deleteBlogById(id: string) {
        try {
            const blog = await Blog.findByIdAndDelete(id);
            return blog;
        } catch (error) {
            console.log("Error deleting blog by ID: ", error)
            return null;
        }
    }
}
