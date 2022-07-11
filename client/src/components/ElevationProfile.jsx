import * as d3 from "d3";
import { useEffect, useState, useRef } from "react";
import Plot from "./Plot";

export default function ElevationProfile(props) {
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
            name: "Pipe Type",
            entries: all[1],
          },
          {
            name: "Topsoil",
            entries: all[2],
          },
          {
            name: "Depth Cover",
            entries: all[3],
          },
        ],
      });

      console.log("data fetched", data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ref = useRef(null);
  const [rectWidth, setRectWidth] = useState(500);

  useEffect(() => {
    const handleResize = () => {
      ref.current && setRectWidth(ref.current.offsetWidth);
    };

    handleResize()
    window.addEventListener("resize", handleResize);
  },[]);

  return (
    <div className="plot-container" ref={ref}>
      <Plot
        data={data}
        x={(d) => d.chainage * 1}
        y={(d) => d.elevation * 1}
        width={rectWidth}
      />
    </div>
  );
}
