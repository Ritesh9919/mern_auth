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
      .json(new ApiResponse(true, "User signup successfully"));
  } catch (error) {
    console.error("error in authController signup api", error.message);
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(new ApiError("user not found", 404));
    }
    const validPassword = await validUser.comparePassword(password);
    if (!validPassword) {
      return next(new ApiError("Invalid Credentials", 401));
    }
    const user = await User.findById(validUser._id).select("-password");
    const token = await validUser.generateToken();
    const expiryDate = new Date(Date.now() + 3600000); // 1h
    return res
      .cookie("token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(new ApiResponse(true, "Sign in successfully", user));
  } catch (error) {
    console.error("error in authController signin api", error.message);
    next(error);
  }
};
