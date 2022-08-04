require("dotenv").config();
const wkx = require('wkx')
const centerlineQueries = require("./centerlineQueries");
const db = require("../../db");

centerlineQueries.getAllCenterlines(db).then((res) => {
  console.log(res);
  console.log(wkx.Geometry.parse(res[0].line))
  

});
