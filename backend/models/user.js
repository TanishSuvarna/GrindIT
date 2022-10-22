import mongoose from "mongoose";
const Schema = mongoose.Schema;

const user = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  phoneNumber: {
    type: Number,
    required: true,
    length: 10,
  },
  leetcodeId: {
    type: String,
  },
  hackerRankId: {
    type: String,
  },
  codeNinjaId: {
    type: String,
  },
  userBlog: [
    {
      type: mongoose.Types.ObjectId,
      ref: "blogs",
      required: true,
    },
  ],
  reminders: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Reminder",
      required: true,
    },
  ],
});
export default mongoose.model("User", user);
