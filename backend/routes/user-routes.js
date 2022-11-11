import Express from "express";
import {
  getAllUsers,
  login,
  signup,
  leetcodeData,hackerrankData,
  deleteUser,
  updateUserReminder,
  getQuestionsByid,
  getUserByid,
  codeforcesData
} from "../controller/user-controller";

const router = Express.Router();

router.get("/", getAllUsers);
router.get("/userData/leetcode/:leetcodeId",leetcodeData);
router.get("/userData/hackerrank/:hackerrankId",hackerrankData);
router. get("/userData/codeforces/:codeforcesId",codeforcesData);
router.get("/:id", getUserByid);
router.post("/signup", signup);
router.post("/login", login);
router.delete("/:id", deleteUser);
router.put("/reminderUpdate/:id", updateUserReminder);
router.get("/questions/:id", getQuestionsByid);
export default router;
