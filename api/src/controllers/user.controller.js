import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const test = (req, res) => {
  res.send("Api is working");
};

export const updateUserProfile = async (req, res, next) => {
  try {
    if (req.user.userId !== req.params.userId) {
      return next(new ApiError("You can only update your account", 400));
    }
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    ).select("-password");

    return res.status(200).json(new ApiResponse(true, "profile updated", user));
  } catch (error) {
    console.error(
      "error in userController updateUserProfile api",
      error.message
    );
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    if (req.user.userId !== req.params.userId) {
      return next(new ApiError("You can only delete your account", 400));
    }
    await User.findByIdAndDelete(req.params.userId);
    return res.status(200).json(new ApiResponse(true, "user deleted"));
  } catch (error) {
    console.error("error in userController deleteUser api", error.message);
    next(error);
  }
};
