import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./src/db/index.js";
import path from "path";

import errorHandlerMiddleware from "./src/middlewares/error_handler.middleware.js";
import notFoundMiddleware from "./src/middlewares/notFound.middleware.js";

import userRouter from "./src/routes/user.route.js";
import authRouter from "./src/routes/auth.route.js";

const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();
const app = express();
app.use(express.static(path.join(__dirname, "/frontent/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
app.use(express.json());
app.use(cookieParser());

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
