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

// // Separated Routes for each Resource
// const usersRoutes = require("./routes/users");
// const mapsRoutes = require("./routes/maps");
// const pinsRoutes = require("./routes/pins");
// const favouritesRoutes = require("./routes/favourites");
// const map_editorsRoutes = require("./routes/map_editors");

// // Mount all resource routes
// app.use('/users', usersRoutes);
// app.use('/maps', mapsRoutes);
// app.use('/pins', pinsRoutes);
// app.use('/favourites', favouritesRoutes);
// app.use('/map_editors', map_editorsRoutes);

// app.listen(PORT, () => {
//   console.log(`Example app listening on port ${PORT}`);
// });