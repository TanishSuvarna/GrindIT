import mongoose from "mongoose";
import blogs from "../models/blogs";
import user from "../models/user";
import comments from "../models/comments";

export const postComment = async (req,res,next) =>{
    const {description,ourUser,ourBlog} = req.body;
    let existingUser;
    try{
        existingUser = await user.findById(ourUser);
    }catch(err){
        return console.log(err);
    }
    let currBlog;
    try{
        currBlog =await blogs.findById(ourBlog);
    }catch(err){
        return console.log(err);
    }
    const newComment = new comments({description,ourUser,ourBlog});
    try{
    const session = await mongoose.startSession();
            session.startTransaction();
            newComment.save(session);
            existingUser.userComments.push(newComment);
            currBlog.userComments.push(newComment);
            existingUser.save(session);
            currBlog.save(session);
            await session.commitTransaction()
    }catch(err){
        return res.status(400).json({message:err})
    }
    return res.status(200).json({newComment});
}

export const editComment = async (req,res,next) => {
    const commentId = req.params.id;
    console.log(commentId);
    const {description} = req.body;
    let newComment;
    try{
        newComment = await comments.findByIdAndUpdate(commentId,{description});
    }catch(err){
        return console.log(err);
    }
    if(!newComment){
        return res.status(500).json({message:"Can't Update The Comment Please Try Again Later"});
    } 
    return res.status(200).json({newComment});
}
export const deleteComment = async(req,res,next) =>{
    const commentId = req.params.id;
    let getComment;
    try{
        getComment = await comments.findByIdDelete(commentId).populate("ourUser").populate("ourBlog");
        getComment.ourUser.userComments.pull(commentId);
        getComment.ourBlog.userComments.pull(commentId);
        await getComment.ourUser.save();
        await getComment.ourBlog.save();
    }catch(err){
        return res.status(400).json({message:err});
    }
    if(!getComment){
        return res.status(400).json({message:"Comment Not Found"});
    }
    return res.status(200).json({message:"Comment Deleted"})
}