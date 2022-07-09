import * as d3 from "d3";
import Axis from "./Axis";
import ToolTip from "./ToolTip";

import formatKP from "../../helpers/formatKP";

export default function Plot(props) {
  const {
    data = { elevation: [], ranges: [] },
    x = ([x]) => x, // given d in data, returns the (temporal) x-value
    y = ([, y]) => y, // given d in data, returns the (quantitative) y-value
    xString,
    yString,
    curve = d3.curveLinear, // method of interpolation between points
    rangeHeight = 16,
    margin = { top: 20, right: 40, left: 40, bottom: 30 },
    width = 600, // outer width, in pixels
    height = 200, // outer height, in pixels
    xType = d3.scaleLinear, // the x-scale type
    yType = d3.scaleLinear, // the y-scale type
    yFormat, // a format specifier string for the y-axis
    yLabel, // a label for the y-axis
    color = "red", // stroke color of line
  } = props;

  const X = data.elevation.map(x);
  const Y = data.elevation.map(y);
  const I = d3.range(X.length);

  const xRange = [margin.left, width - margin.right];
  const yRange = [height - margin.bottom, margin.top];

  const xDomain = d3.extent(X);
  const yDomain = [0, d3.max(Y)];

  const xScale = xType(xDomain, xRange);
  const yScale = yType(yDomain, yRange);

  const drawLine = d3
    .line()
    .curve(curve)
    .x((i) => xScale(X[i]))
    .y((i) => yScale(Y[i]));

  return (
    <svg
      width={width}
      height={height}
      viewBox={[0, 0, width, height].join(",")}
      style={{ maxWidth: "100%", height: "auto intrinsic" }}
    >
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
      <path
        className="line"
        d={drawLine(I)}
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <ToolTip
        width={width}
        height={height}
        margin={margin}
        xScale={xScale}
        yScale={yScale}
        xString={formatKP}
        yString={yString}
      />
    </svg>
  );
}
