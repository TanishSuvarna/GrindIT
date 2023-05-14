import Express from "express";
import {
  postComment,
  editComment,
  deleteComment,
} from "../controller/comments-controller";
const commentsRouter = Express.Router();

commentsRouter.post("/", postComment);
commentsRouter.put("/:id", editComment);
commentsRouter.delete("/:id", deleteComment);
export default commentsRouter;
