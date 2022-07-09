import * as d3 from "d3";
import Axis from "./Axis";
import ToolTip from "./ToolTip";

import formatKP from "../../helpers/formatKP";
import formatElevation from "../../helpers/formatElevation";

import { useState } from "react";
import { useEffect } from "react";

export default function Plot(props) {
  const {
    data = { elevation: [], ranges: [] },
    x = ([x]) => x, // given d in data, returns the (temporal) x-value
    y = ([, y]) => y, // given d in data, returns the (quantitative) y-value
    curve = d3.curveLinear, // method of interpolation between points
    rangeHeight = 16,
    margin = { top: 30, right: 60, left: 40, bottom: 30 },
    width = 600, // outer width, in pixels
    height = 200, // outer height, in pixels
    xType = d3.scaleLinear, // the x-scale type
    yType = d3.scaleLinear, // the y-scale type
    color = "red", // stroke color of line
  } = props;

  const X = data.elevation.map(x);
  const Y = data.elevation.map(y);
  const I = d3.range(X.length);

  const xRange = [margin.left, width - margin.right];
  const yRange = [height - margin.bottom, margin.top];

  const [xDomain, setXDomain] = useState([null, null]);
  useEffect(
    () => setXDomain(d3.extent(X)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data.elevation]
  );
  const yDomain = [0, d3.max(Y)];

  const xScale = xType(xDomain, xRange);
  const yScale = yType(yDomain, yRange);

  const drawLine = d3
    .line()
    .curve(curve)
    .x((i) => xScale(X[i]))
    .y((i) => yScale(Y[i]));

  function zoom(event) {
    const mouseX = event.nativeEvent.offsetX;
    const valueX = xScale.invert(mouseX);

    // console.log(event);
    console.log(valueX, event.nativeEvent.deltaY);
  }

  return (
    <div className="pan-zoom" onWheel={zoom}>
      <svg
        width={width}
        height={height}
        viewBox={[0, 0, width, height].join(",")}
        style={{ maxWidth: "100%", height: "auto intrinsic" }}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          <clipPath id="clip">
            <rect
              x={margin.left}
              y={margin.top}
              width={width - margin.left - margin.right}
              height={height - margin.top - margin.bottom}
            />
          </clipPath>
        </defs>
        <Axis
          domain={xDomain}
          range={xRange}
          options={{
            side: "bottom",
            transform: `translate(0,${height - margin.bottom})`,
            pixelsPerTick: 80,
            stringFunc: formatKP,
          }}
        />
        <Axis
          domain={yDomain}
          range={yRange}
          options={{
            side: "left",
            transform: `translate(${margin.left},0)`,
            includeDomain: false,
            gridLines: width - margin.right - margin.left,
          }}
        />
        <Axis
          domain={yDomain}
          range={yRange}
          options={{
            side: "right",
            transform: `translate(${width - margin.right},0)`,
            includeDomain: false,
          }}
        />
        <g clipPath="url(#clip)">
          <path
            className="line"
            d={drawLine(I)}
            fill="none"
            stroke={color}
            strokeWidth={1.5}
          />
        </g>
        <ToolTip
          xFunc={x}
          yFunc={y}
          data={data.elevation}
          width={width}
          height={height}
          margin={margin}
          xScale={xScale}
          yScale={yScale}
          xString={formatKP}
          yString={formatElevation}
        />
      </svg>
    </div>
  );
}
