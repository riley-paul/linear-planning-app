// load .env data into process.env
require("dotenv").config();

const express = require("express");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(morgan("dev"));
app.use(express.json());

app.use("/", (req, res) => res.send("Hello"));

// app.use("/test", (req, res) => {
//   const testData = require("./db/data/test.geojson");
//   res.json(testData);
// });

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
