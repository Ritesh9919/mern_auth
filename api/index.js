import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import connectDB from "./src/db/index.js";

import userRouter from "./src/routes/user.route.js";

const PORT = process.env.PORT || 8000;

const app = express();

app.use("/api/users", userRouter);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
