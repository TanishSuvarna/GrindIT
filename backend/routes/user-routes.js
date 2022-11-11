import Express from "express";
import {  getAllUsers, login, signup,leetcodeData,hackerrankData } from "../controller/user-controller";

const router = Express.Router();

router.get("/" , getAllUsers);
router.get("/userData/leetcode/:leetcodeId",leetcodeData);
router.get("/userData/hackerrank/:hackerrankId",hackerrankData);
router.get("/userData/codeforces/:codeforcesId",codeforcesData);
router.post("/signup",signup);
router.post("/login",login);
export default router;

