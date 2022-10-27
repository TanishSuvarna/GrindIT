import mongoose from "mongoose";
const Schema = mongoose.Schema;

const blogs = new Schema({
    title:{
        type: String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    ourUser :{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    },
    userComments:[
        {
            type:mongoose.Types.ObjectId,
            ref:"comments",
            required:true
        }
    ]
})
export default mongoose.model("blogs" , blogs); 
