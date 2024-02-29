import { IBlog, Blog } from "../models/blog";

export default class BlogService {
   static async createBlog(title: string, content: string, author: string): Promise<IBlog | null> {
        try {
            if (!title || !content || !author) {
                throw new Error("Missing required fields");
            }
            const blog = new Blog({
                title: title,
                content: content,
                author: author
            });
            return await blog.save();
        } catch (error) {
            console.error("Error creating blog:", error);
            return null; 
        }
    }
}
