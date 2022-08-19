import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors"

import expressListRoutes from "express-list-routes"

import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";
import projectRouter from "./routes/projects.js";
import centerlineRouter from "./routes/centerlines.js";
import takeoffRouter from "./routes/takeoffs.js";
import { verfiyToken } from "./verifyToken.js";

const app = express();

const PORT = process.env.PORT || 8000;

dotenv.config();

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(process.env.MONGO_URL, mongooseOptions)
  .then(console.log("connected to MongoDB"))
  .catch((err) => console.error(err));

// CORS
// const corsOptions = {
//   origin: "http://localhost:3000",
//   optionsSuccessStatus: 200,
// }

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// middleware
app.use(express.json());
app.use(morgan("common"));
app.use(helmet());
app.use(cookieParser());
// app.use(verfiyToken)

// routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/projects", projectRouter);
app.use("/api/centerlines", centerlineRouter);
app.use("/api/takeoffs", takeoffRouter);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});


app.listen(PORT, () => {
  console.log(`server listing on port ${PORT}`);
  expressListRoutes(app)
});
