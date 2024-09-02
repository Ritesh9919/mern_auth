import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import connectDB from "./src/db/index.js";

import errorHandlerMiddleware from "./src/middlewares/error_handler.middleware.js";
import notFoundMiddleware from "./src/middlewares/notFound.middleware.js";

import userRouter from "./src/routes/user.route.js";
import authRouter from "./src/routes/auth.route.js";

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
