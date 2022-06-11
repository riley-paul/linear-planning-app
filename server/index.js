require("dotenv").config();

const PORT = process.env.PORT || 8080;
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");

app.use(express.static("public"))
app.use(morgan("dev"));
app.use(cors())

app.get("/", (req, res) => {
  res.send("Welcome to the file server");
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
