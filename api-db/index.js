import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";
import projectRouter from "./routes/projects.js";
import centerlineRouter from "./routes/centerlines.js";
import takeoffRouter from "./routes/takeoffs.js";

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

// middleware
app.use(express.json());
app.use(morgan("common"));
app.use(helmet());

// routes

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/projects", projectRouter);
app.use("/api/centerlines", centerlineRouter);
app.use("/api/takeoffs", takeoffRouter);

app.listen(PORT, () => {
  console.log(`server listing on port ${PORT}`);
});
