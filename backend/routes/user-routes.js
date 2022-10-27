import Express from "express";
import {  getAllUsers, login, signup,getUserData } from "../controller/user-controller";

const router = Express.Router();

router.get("/" , getAllUsers);
router.get("/userData/:leetcodeId",getUserData);
router.post("/signup",signup);
router.post("/login",login);
export default router;

