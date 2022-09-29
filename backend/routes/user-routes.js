import Express from "express";
import {  getAllUsers, login, signup } from "../controller/user-controller";

const router = Express.Router();

router.get("/" , getAllUsers);
router.post("/signup",signup);
router.post("/login",login);
export default router;

