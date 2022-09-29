import mongoose from "mongoose";
const Schema = mongoose.Schema;

const user = new Schema({
    name : {
        type: String,
        required:true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    password :{
        type:String,
        required:true,
        minlength :6
    },
    userBlog:[{
        type:mongoose.Types.ObjectId,
        ref:"blogs",
        required:true
    }
    ]
})
export default mongoose.model("User" , user);