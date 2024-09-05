import express from "express";
const router = express.Router();
import {
  signup,
  signin,
  signinWithGoogle,
} from "../controllers/auth.controller.js";

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", signinWithGoogle);

export default router;
