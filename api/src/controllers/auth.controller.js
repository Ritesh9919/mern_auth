import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ApiError("User already exist", 400));
    }
    const user = await User.create({ username, email, password });
    return res
      .status(201)
      .json(new ApiResponse(true, "User signup successfully", user));
  } catch (error) {
    console.error("error in authController signup api", error.message);
    next(error);
  }
};
