import Express from "express";
import {
  getAllUsers,
  login,
  signup,
  getUserData,
  deleteUser,
  updateUserReminder,
  getQuestionsByid,
} from "../controller/user-controller";

const router = Express.Router();

router.get("/", getAllUsers);
router.get("/userData/:leetcodeId", getUserData);
router.post("/signup", signup);
router.post("/login", login);
router.delete("/:id", deleteUser);
router.put("/reminderUpdate/:id", updateUserReminder);
router.get("/questions/:id", getQuestionsByid);
export default router;
