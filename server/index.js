require("dotenv").config();

const PORT = process.env.PORT || 8080;
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");

app.use(morgan("dev"));
app.use(cors())

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/test", (req, res) => {
  const data = JSON.parse(fs.readFileSync("db/data/CNTRLINE.geojson"));
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
