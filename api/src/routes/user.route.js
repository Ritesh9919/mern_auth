import express from "express";
const router = express.Router();
import verifyJWT from "../middlewares/auth.middleware.js";
import {
  test,
  updateUserProfile,
  deleteUser,
} from "../controllers/user.controller.js";

router.get("/", test);
router.put("/update/:userId", verifyJWT, updateUserProfile);
router.delete("/delete/:userId", verifyJWT, deleteUser);

export default router;
