const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");

const PORT = process.env.PORT || 8000;

dotenv.config();

mongooseOptions = {
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

app.listen(PORT, () => {
  console.log(`server listing on port ${PORT}`);
});
