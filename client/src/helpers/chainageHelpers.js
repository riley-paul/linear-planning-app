const turf = require("@turf/turf");
const shapefile = require("shapefile");

// var line = turf.lineString([
//   [-77.031669, 38.878605],
//   [-77.029609, 38.881946],
//   [-77.020339, 38.884084],
//   [-77.025661, 38.885821],
//   [-77.021884, 38.889563],
//   [-77.019824, 38.892368]
// ]);
// var pt = turf.point([-77.037076, 38.884017]);

// var snapped = turf.nearestPointOnLine(line, pt, { units: 'miles' });

// console.log(snapped)

shapefile.open()