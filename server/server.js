// load .env data into process.env
require("dotenv").config();

const express = require("express");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(morgan("dev"));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
