import * as d3 from "d3";
import { useEffect, useState, useRef } from "react";
import Plot from "./Plot";
import axios from "axios";
import Loading from "./Plot/Loading";

const API_URL = process.env.REACT_APP_API_URL

export default function ElevationProfile(props) {
  const [takeoffs, setTakeoffs] = useState([]);
  const [elevation, setElevation] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all(
      axios.get(API_URL + '/centerlines')
    )
  })

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
      {!data.elevation.length ? (
        <Loading width={rectWidth} height={250} />
      ) : (
        <Plot
          data={data}
          x={(d) => d.chainage * 1}
          y={(d) => d.elevation * 1}
          width={rectWidth}
          height={250}
        />
      )}
    </div>
  );
}
