import  Express  from "express";
import { addBlog, blogById, deleteBlogById, getAllBlogByUserId, getAllBlogs, updateBlog } from "../controller/blog-controller";
const blogRouter = Express.Router();

blogRouter.get('/' , getAllBlogs);
blogRouter.post('/addBlog',addBlog);
blogRouter.put('/updateBlog/:id',updateBlog);
blogRouter.get('/:id',blogById);
blogRouter.delete('/:id',deleteBlogById)
blogRouter.get('/allBlogs/:id', getAllBlogByUserId)
export default blogRouter;
