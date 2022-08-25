import { useState } from "react";
import { bisector } from "d3";

export default function ToolTip(props) {
  const {
    width,
    height,
    data,
    xFunc,
    yFunc,
    margin,
    xScale,
    yScale,
    xString,
    yString,
  } = props;

  const [pointerCoords, setPointerCoords] = useState({ x: 0, y: 0 });
  const [displayTip, setDisplayTip] = useState(false);
  const bisect = bisector(xFunc).left;

  function mouseMove(e) {
    const mouseX = e.nativeEvent.offsetX;
    const valueX = xScale.invert(mouseX);
    const selectedData = data[bisect(data, valueX)];

    if (!selectedData) return;

    setPointerCoords({
      x: mouseX,
      y: yScale(yFunc(selectedData)),
    });
  }

  return (
    <g className="tooltip">
      <rect
        fill="none"
        pointerEvents="all"
        x={margin.left}
        y={margin.top}
        width={width - margin.right - margin.left}
        height={height - margin.top - margin.bottom}
        onMouseOver={() => setDisplayTip(true)}
        onMouseOut={() => setDisplayTip(false)}
        onMouseMove={mouseMove}
      />
      {displayTip && (
        <g transform={`translate(${pointerCoords.x},0)`} pointerEvents="none">
          <line
            stroke="currentcolor"
            y2={height - margin.bottom}
            strokeWidth={0.5}
            strokeOpacity={0.5}
          />
          <text fontSize="10px" transform="translate(0,10)">
            <tspan x="5">{xString(xScale.invert(pointerCoords.x))}</tspan>
            <tspan x="5" dy="1.2em">
              {yString(yScale.invert(pointerCoords.y))}
            </tspan>
          </text>
          <circle fill="red" r={4} cy={pointerCoords.y} />
        </g>
      )}
    </g>
  );
}
