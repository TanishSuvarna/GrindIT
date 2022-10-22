import { error } from "console";
import mongoose from "mongoose";
import blogs from "../models/blogs";
import user from "../models/user";
export const getAllBlogs = async (req , res , next) =>{
    let allBlogs;
    try{
        allBlogs = await blogs.find().populate("ourUser");
    }catch(err){
        return console.log(err);
    }
    if(allBlogs){
        return res.status(200).json({allBlogs});
    }
    else{
        return res.status(404).json({message:"No Blogs Found Please Create A Blog"});
    }
}

export const addBlog = async (req,res,next)=>{
    const{title,description,ourUser} = req.body;
    let existingUser;
    try{
        existingUser = await user.findById(ourUser);
    }catch(err){
        return console.log(err);
    }
    if(!existingUser){
        return res.status(400).json({message:"No User Found"});
    }
    const newBlog = new blogs({title,description,ourUser,userComments:[]});
        try{
            const session = await mongoose.startSession();
            try{
            session.startTransaction();
             newBlog.save({session});
            existingUser.userBlog.push(newBlog);
             existingUser.save({session});
           
        }catch(err){
            console.log(err);
            await session.abortTransaction();
        }
            await session.commitTransaction();
        }catch(err){
            return res.status(400).json({message:err});
        }
        return res.status(200).json({newBlog});
    }

export const updateBlog = async (req,res,next) => {
    const blogid = req.params.id;
    const{title,description} = req.body;
    let newBlog;
    try{
        newBlog = await blogs.findByIdAndUpdate(blogid,{title,description});
    }catch(err){
        return console.log(err);
    }
    if(!newBlog){
        return res.status(500).json({message:"Can't Update The Blog Please Try Again Later"});
    }
    return res.status(200).json({newBlog});
}
export const blogById = async(req,res,next) =>{
    const blogId = req.params.id;
    let showBlog;
    try{
        showBlog =await blogs.findById(blogId).populate({path :"userComments" , populate :{
            path : "ourUser"
        }});
    }catch(err){
        return console.log(err);
    }
    if(!showBlog){
        return res.status(404).json({message:"No Blogs Found"});
    }
    else{
        return res.status(201).json({showBlog});
    }
}
export const deleteBlogById =async (req,res,next)=>{
    const blogId = req.params.id;
    let userId;
    try{
        userId = await blogs.findById(blogId);
        if(!userId){
            return res.status(500).json({message:"Blog Not Found"});
        }
        userId = userId.ourUser.toString();
        const blogsUser = await user.findById(userId);
        await blogsUser.userBlog.pull(blogId);
        await blogsUser.save();
        await blogs.findByIdAndDelete(blogId);
        return res.status(200).json({message:"Blog Deleted"});
    }catch(err){
        return console.log(err);
    }
}

export const getAllBlogByUserId = async (req,res,next)=>{
    const userid = req.params.id;
    let allBlogs;
    try{
       allBlogs =  await user.findById(userid).populate("userBlog"); 
    }catch(err){
        console.log(err);
    }
    if (!allBlogs) {
        return res.status(404).json({ message: "No Blog Found" });
      }
      return res.status(200).json({message:allBlogs.userBlog});
    };