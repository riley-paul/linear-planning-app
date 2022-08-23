import express from "express"

import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";


// import authRouter from "./routes/auth.js";
// import userRouter from "./routes/users.js";
// import projectRouter from "./routes/projects.js";
import centerlineRouter from "./routes/centerlines.js";
// import takeoffRouter from "./routes/takeoffs.js";

const app = express();

// CORS
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// middleware
app.use(express.json({ limit: "5mb" }));
app.use(morgan("common"));
app.use(helmet());
app.use(cookieParser());
// app.use(verfiyToken)

// routes
// app.use("/api/users", userRouter);
// app.use("/api/auth", authRouter);
// app.use("/api/projects", projectRouter);
app.use("/api/centerlines", centerlineRouter);
// app.use("/api/takeoffs", takeoffRouter);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

export default app;