import React from "react";
import * as d3 from "d3";
import LineChart from "./LineChart";

export default function ElevationPlot(props) {
  const options = {
    x: (d) => d.chainage * 1,
    y: (d) => d.elevation * 1,
    xType: d3.scaleLinear,
    color: "red",
    yLabel: "↑ Elevation (m)",
    // width: bounds.width,
    height: 200,
  };

  React.useEffect(() => {
    d3.csv("http://localhost:8080/projects/elevation_profile_reduced.csv")
      .then((dataset) => {
        return <LineChart data={dataset} {...options} />;
      })
      .catch((e) => {
        console.log("Could not plot data...");
        console.error(e);
      });
  });
}
