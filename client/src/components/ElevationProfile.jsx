import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Plot from "./Plot";

import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

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

  const centerline = useSelector((state) => state.centerline.currentCenterline);
  const loading = useSelector((state) => state.centerline.loading);
  const error = useSelector((state) => state.centerline.error);

  console.log(centerline)

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
      {loading ? (
        <>
          <CircularProgress />
          <ErrorText>Loading Elevation Data</ErrorText>
        </>
      ) : centerline.elevation.rows.length === 0 ? (
        <ErrorText>No Elevation Data for Centerline</ErrorText>
      ) : (
        <Plot
          elevation={centerline.elevation.rows}
          x={(d) => d.x * 1}
          y={(d) => d.y * 1}
          width={rectWidth}
          height={250}
        />
      )}
    </Container>
  );
}
