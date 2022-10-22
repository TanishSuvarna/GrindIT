import mongoose from "mongoose";
const Schema = mongoose.Schema;

const reminder = new Schema({
  title: {
    type: String,
    required: true,
  },
  noofques: {
    type: Number,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },

  ourUser: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
export default mongoose.model("Reminder", reminder);
