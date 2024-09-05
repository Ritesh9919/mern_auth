import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const test = (req, res) => {
  res.send("Api is working");
};

export const updateUserProfile = async (req, res, next) => {
  if (req.user.userId !== req.params.userId) {
    return next(new ApiError("You can only update your account", 400));
  }
  try {
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
    );

    return res.status(200).json(new ApiResponse(true, "profile updated", user));
  } catch (error) {
    console.error(
      "error in userController updateUserProfile api",
      error.message
    );
    next(error);
  }
};
