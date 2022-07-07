import Map from "./components/Map";
import Plot from "./components/Plot";
import * as d3 from "d3";
import { useEffect } from "react";
import { useState } from "react";

export default function App() {
  const [data, setData] = useState({ elevation: [], ranges: [] });

  useEffect(() => {
    Promise.all([
      d3.csv("http://localhost:3000/elevation_profile_reduced.csv"),
      d3.csv("http://localhost:3000/pipe_seg.csv"),
      d3.csv("http://localhost:3000/topsoil.csv"),
      d3.csv("http://localhost:3000/depth_cover.csv"),
    ]).then((all) => {
      setData({
        elevation: all[0],
        ranges: [
          {
            name: "Pipe Segmentation",
            data: all[1],
          },
          {
            name: "Topsoil Depth",
            data: all[2],
          },
          {
            name: "Depth of Cover",
            data: all[3],
          },
        ],
      });

      console.log("data fetched", data);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <div className="App" style={{ margin: "10px" }}>
      <Plot data={data}
          x= {(d) => d.chainage * 1}
          y= {(d) => d.elevation * 1}
          // xType: d3.scaleLinear,
          // color: "red",
          // yLabel: "↑ Elevation (m)",
          // width: bounds.width,
          // height: 200,
          // xString: formatKP,
          // yString: (num) => numeral(num).format("0,0"),
          // curve: d3.curveLinear,
      ></Plot>
      {/* <Map />   */}
    </div>
  );
}
