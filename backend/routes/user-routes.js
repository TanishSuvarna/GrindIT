import Express from "express";
import {
  getAllUsers,
  login,
  signup,
  deleteUser,
  updateUserReminder,
  getQuestionsByid,
} from "../controller/user-controller";

const router = Express.Router();

router.get("/", getAllUsers);
router.post("/signup", signup);
router.post("/login", login);
router.delete("/:id", deleteUser);
router.put("/reminderUpdate/:id", updateUserReminder);
router.get("/questions/:id", getQuestionsByid);
export default router;
