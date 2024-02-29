import { Router , Request, Response} from "express";
import { validateBlogObject } from "../models/blog";
import BlogService from "../services/blogServices";

const router = Router();

router.post('/', (req : Request, res: Response)=> {
    const {error} = validateBlogObject(req.body)
    if(error){
        res.status(401).send("Invalid data");
        return;
    }
    const {title, content, author} = req.body;
    BlogService.createBlog(title, content, author)
})