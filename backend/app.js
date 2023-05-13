import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog-routes";
import router from "./routes/user-routes";
import commentsRouter from "./routes/comments-routes";
import reminderRouter from "./routes/reminder-routes";
import cors from "cors";
import dotenv from 'dotenv'
dotenv.config();
mongoose.connect("mongodb+srv://tanish:tanish@cluster0.ujzpwdo.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const app = express();
app.use(cors());
app.use(express.json());
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connection Successfull");
});
app.listen(5000);

app.use("/api/user", router);
app.use("/api/blog", blogRouter);
app.use("/api/blog/comments", commentsRouter);
app.use("/api/reminders", reminderRouter);
