const turf = require("@turf/turf");
const fs = require("fs/promises");

class LinearProject {
  constructor(line, points, area) {
    this.line = line;
    this.points = points;
    this.area = area;
  }

  findKP(point) {
    const snapped = turf.nearestPointOnLine(this.line, point);
    console.log("snapped",snapped)
    const nearestKP = turf.nearestPoint(snapped, this.points);
    return nearestKP;
  }
}

const importProject = () => {
  return Promise.all([
    fs.readFile("./data/CNTRLINE.geojson"),
    fs.readFile("./data/FTPRINT.geojson"),
    fs.readFile("./data/MRKRS.geojson"),
  ]).then((all) => {
    return new LinearProject(
      JSON.parse(all[0]),
      JSON.parse(all[1]),
      JSON.parse(all[2])
    );
  });
};

module.exports = { LinearProject, importProject };
