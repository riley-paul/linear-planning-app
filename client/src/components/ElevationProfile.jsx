import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Plot from "./Plot";
import Error from "./Plot/Error";

import { CircularProgress } from "@mui/material";

const Container = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
`;

const ErrorText = styled.div`
  padding-top: 10px;
  color: ${({ theme }) => theme.textSoft};
  font-size: smaller;
`;

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
    <Container className="plot-container" ref={ref}>
      {!elevation ? (
        <>
          <CircularProgress />
          <ErrorText>Loading Elevation Data</ErrorText>
        </>
      ) : elevation.length === 0 ? (
        <ErrorText>No Elevation Data for Centerline</ErrorText>
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
    </Container>
  );
}
