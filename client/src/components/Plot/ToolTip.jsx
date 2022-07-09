import { useState } from "react";

export default function ToolTip(props) {
  const { width, height, margin, xScale, yScale, xString, yString } = props;

  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const [displayTip, setDisplayTip] = useState(false);

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
        onMouseMove={(e) => {
          setMouseCoords({
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY,
          });
        }}
      />
      {displayTip && (
        <g transform={`translate(${mouseCoords.x + 10},${mouseCoords.y})`}>
          <text fontSize="10px">
            <tspan x="0">{xString(xScale.invert(mouseCoords.x))}</tspan>
            <tspan x="0" dy="1.2em">
              {yString(yScale.invert(mouseCoords.y))}
            </tspan>
          </text>
        </g>
      )}
    </g>
  );
}
