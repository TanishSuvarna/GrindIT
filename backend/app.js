import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog-routes";
import router from "./routes/user-routes";

import cors from "cors";
import reminderRouter from "./routes/reminder-routes";
mongoose.connect("mongodb://127.0.0.1:27017/discuss", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);
app.use("/api/reminders", reminderRouter);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connection Successfull");
});
app.listen(5000);
