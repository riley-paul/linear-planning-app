import { useEffect, useState, useRef } from "react";
import Plot from "../Plot";
import Error from "../Plot/Error";
import getData from "./getData";

export default function ElevationProfile(props) {
  const { project, projectDisplay } = props;

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

  const data = getData(project, projectDisplay);

  return (
    <div className="plot-container" ref={ref}>
      {data.error ? (
        <Error width={rectWidth} height={250} message={data.error} />
      ) : (
        <Plot
          elevation={data.elevation}
          ranges={data.takeoffs}
          x={(d) => d.chainage * 1}
          y={(d) => d.elevation * 1}
          width={rectWidth}
          height={250}
        />
      )}
    </div>
  );
}
