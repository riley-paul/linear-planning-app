// load .env variables
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const resetDb = require("./db/reset");

app.use(cors());
app.use(express.static("data"));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

const db = require("./db");

// Separated Routes for each Resource
const centerlinesRoutes = require("./routes/centerlines");
const projectsRoutes = require("./routes/projects");
const takeoffsRoutes = require("./routes/takeoffs");

app.use("/api/reset", (req, res) => {
  resetDb(db).then(() => {
    console.log("Database Reset");
    res.status(200).send("Database Reset");
  });
});

/**
 * api routes examples:
 *  /api/projects/1/centerlines/1
 *  /api/projects/1/takeoffs/5
 *
 *  /api/projects/1/centerlines/1/centerline
 *  /api/projects/1/centerlines/1/footprint
 *  /api/projects/1/centerlines/1/elevation
 *
 *  */

// Mount all resource routes
// app.use("/users", usersRoutes);
// app.use("/maps", mapsRoutes);
// app.use("/pins", pinsRoutes);
// app.use("/favourites", favouritesRoutes);
// app.use("/map_editors", map_editorsRoutes);

app.close = () => db.end();

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
