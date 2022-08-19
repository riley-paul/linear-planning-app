
import { useEffect, useState, useRef } from "react";
import Plot from "./Plot";
import Error from "./Plot/Error";

export default function ElevationProfile(props) {
  const { elevation, takeoffs } = props;

  // determine width of parent element
  const ref = useRef(null);
  const [rectWidth, setRectWidth] = useState(500);

  useEffect(() => {
    const handleResize = () => {
      ref.current && setRectWidth(ref.current.offsetWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div className="plot-container" ref={ref}>
      {!elevation ? (
        <Error width={rectWidth} height={250} message={"Loading Data..."} />
      ) : elevation.length === 0 ? (
        <Error width={rectWidth} height={250} message={"No Elevation Data"} />
      ) : (
        <Plot
          elevation={elevation}
          ranges={takeoffs.filter((i) => i.selected)}
          x={(d) => d.x * 1}
          y={(d) => d.y * 1}
          width={rectWidth}
          height={250}
        />
      )}
    </div>
  );
}
