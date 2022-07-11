import * as d3 from "d3";

import Axis from "./Axis";
import ToolTip from "./ToolTip";
import PanZoom from "./PanZoom";
import RangeBar from "./RangeBar";
import Loading from "./Loading";

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
    margin = { top: 30, right: 60, left: 60, bottom: 30 },
    width = 600, // outer width, in pixels
    height = 240, // outer height, in pixels
    rangeHeight = 16,
    xType = d3.scaleLinear, // the x-scale type
    yType = d3.scaleLinear, // the y-scale type
    color = "red", // stroke color of line
  } = props;

  const X = data.elevation.map(x);
  const Y = data.elevation.map(y);
  const I = d3.range(X.length);

  const xRange = [margin.left, width - margin.right];
  const yRange = [
    height - margin.bottom - data.ranges.length * rangeHeight,
    margin.top,
  ];

  const xExtent = d3.extent(X);

  const [xDomain, setXDomain] = useState([null, null]);
  useEffect(
    () => setXDomain(xExtent),
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

  return !data.elevation.length ? (
    <Loading width={width} height={height} />
  ) : (
    <PanZoom
      xScale={xScale}
      xExtent={xExtent}
      xDomain={xDomain}
      setXDomain={setXDomain}
    >
      <svg
        width={width}
        height={height}
        viewBox={[0, 0, width, height].join(",")}
        style={{ maxWidth: "100%", height: "auto intrinsic" }}
        strokeLinecap="round"
        strokeLinejoin="round"
        fontFamily="sans-serif"
        fontSize={10}
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

        <g clipPath="url(#clip)">
          <path
            className="line"
            d={drawLine(I)}
            fill="none"
            stroke={color}
            strokeWidth={1.5}
          />
          {data.ranges.map((range, index) => (
            <RangeBar
              key={index}
              rangeHeight={rangeHeight}
              data={range}
              xScale={xScale}
              width={width}
              margin={margin}
              transform={`translate(0,${
                height - margin.bottom - (index + 1) * rangeHeight
              })`}
            />
          ))}
        </g>

        <g
          className="range-labels"
          transform={`translate(${margin.left - 9},${
            height - margin.bottom - rangeHeight * data.ranges.length
          })`}
        >
          {data.ranges.map((range, index) => (
            <text
              y={rangeHeight * index + rangeHeight / 2}
              dy="0.32em"
              textAnchor="end"
            >
              {range.name}
            </text>
          ))}
        </g>

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
            pixelsPerTick: 10,
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
            pixelsPerTick: 10,
            includeDomain: false,
          }}
        />

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
    </PanZoom>
  );
}
