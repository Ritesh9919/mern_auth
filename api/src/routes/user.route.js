import express from "express";
const router = express.Router();
import verifyJWT from "../middlewares/auth.middleware.js";
import { test, updateUserProfile } from "../controllers/user.controller.js";

router.get("/", test);
router.put("/update/:userId", verifyJWT, updateUserProfile);

export default router;
