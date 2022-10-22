import mongoose from "mongoose";
const Schema = mongoose.Schema;

const comments = new Schema({
    description:{
        type:String,
        required:true,
    },
    ourUser :{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    },
    ourBlog:{
        type:mongoose.Types.ObjectId,
        ref:"blogs",
        required:true,
    },
})
export default mongoose.model("comments" , comments); 