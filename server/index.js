// load .env variables
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const ENV = require("./environment")

console.log(ENV)

const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const read = require("./utils/read")

app.use(cors());
app.use(express.static("data"));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});



// app.use(express.static("public"));

// // Home page
// // Warning: avoid creating more routes in this file!
// // Separate them into separate routes files (see above).

// app.get("/login", (req, res) => {
//   console.log(process.env.USER_ID);
//   res.cookie('userId', process.env.USER_ID);
//   res.cookie('mapsAPIKey', process.env.API_KEY);
//   res.cookie('viewState', 0);
//   res.redirect("/");
// });

// Separated Routes for each Resource
const centerlinesRoutes = require("./routes/centerlines");
const projectsRoutes = require("./routes/projects");
const takeoffsRoutes = require("./routes/takeoffs");


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

// app.listen(PORT, () => {
//   console.log(`Example app listening on port ${PORT}`);
// });
