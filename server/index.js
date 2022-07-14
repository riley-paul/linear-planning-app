// load .env variables
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

app.use(cors());
app.use(express.static("data"));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

const db = require("./db");
const api = require("./routes/api");

app.use("/api", api(db));

app.close = () => db.end();

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
