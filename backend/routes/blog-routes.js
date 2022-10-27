import  Express  from "express";
import { addBlog, blogById, deleteBlogById, getAllBlogByUserId, getAllBlogs, updateBlog } from "../controller/blog-controller";
const blogRouter = Express.Router();

blogRouter.get('/:offset' , getAllBlogs);
blogRouter.post('/addBlog',addBlog);
blogRouter.put('/updateBlog/:id',updateBlog);
blogRouter.get('/allBlogs/oneBlog/:id/:offset',blogById);
blogRouter.delete('/:id',deleteBlogById)
blogRouter.get('/allBlogs/:id/:offset', getAllBlogByUserId)
export default blogRouter;
