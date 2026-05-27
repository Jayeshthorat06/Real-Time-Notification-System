import express from "express";
import { allUser, loginUser, registerUser, userProfile } from "./auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/registration", registerUser);
router.post("/login",loginUser);
router.get("/profile",authMiddleware,userProfile);
router.get("/users",authMiddleware,allUser);

export default router;