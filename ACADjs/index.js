const dfd = require("danfojs-node");
const { importProject } = require("./LinearProject");
const turf = require("@turf/turf");

// dfd.readCSV("WC-685A.csv").then((df) => {
//   df.print();
// });

// importProject().then((cl) => {
//   const pt = turf.point([-121.45, 49.38]);
//   console.log("sample_pt", pt);
//   const chainage = cl.findKP(pt);
//   console.log(chainage);
// });


var line = turf.lineString([[-83, 30], [-84, 36], [-78, 41]], { "stroke": "#F00" });

var offsetLine = turf.lineOffset(line, 2, { units: 'miles' });
console.log(offsetLine)