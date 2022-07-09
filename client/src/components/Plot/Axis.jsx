import * as d3 from "d3";
import { useMemo } from "react";

export default function Axis(props) {
  const { domain, range, options = {} } = props;

  // unpack options
  const {
    scaleType = d3.scaleLinear,
    stringFunc = (i) =>
      i.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }),
    pixelsPerTick = 30,
    side = "bottom",
    transform = "",
    includeDomain = true,
    gridLines,
  } = options;

  const sideParams = {
    bottom: {
      textAnchor: "middle",
      lineCoords: [range[0], 0, range[1], 0],
      transformGroup: (offset) => `translate(${offset},0)`,
      textCoords: [0, 9],
      tickCoords: [0, 6],
      gridCoords: [0, -gridLines],
      labelDy: "0.71em",
    },
    top: {
      textAnchor: "middle",
      lineCoords: [range[0], 0, range[1], 0],
      transformGroup: (offset) => `translate(${offset},0)`,
      textCoords: [0, 9],
      tickCoords: [0, -6],
      gridCoords: [0, gridLines],
      labelDy: "0.71em",
    },
    right: {
      textAnchor: "start",
      lineCoords: [0, range[0], 0, range[1]],
      transformGroup: (offset) => `translate(0,${offset})`,
      textCoords: [9, 0],
      tickCoords: [6, 0],
      gridCoords: [-gridLines, 0],
      labelDy: "0.32em",
    },
    left: {
      textAnchor: "end",
      lineCoords: [0, range[0], 0, range[1]],
      transformGroup: (offset) => `translate(0,${offset})`,
      textCoords: [-9, 0],
      tickCoords: [-6, 0],
      gridCoords: [gridLines, 0],
      labelDy: "0.32em",
    },
  };

  const sideParam = sideParams[side];

  // create scale and determine ticks
  const ticks = useMemo(() => {
    const scale = scaleType().domain(domain).range(range);
    const width = Math.abs(range[1] - range[0]);
    // const numberOfTicksTarget = Math.max(1, Math.floor(width / pixelsPerTick));
    const numberOfTicksTarget = width / pixelsPerTick;
    return scale
      .ticks(numberOfTicksTarget)
      .map((value) => ({ value, offset: scale(value) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domain.join("-"), range.join("-")]);

  return (
    <g transform={transform}>
      {includeDomain && (
        <line
          stroke="currentColor"
          className="domain"
          x1={sideParam.lineCoords[0]}
          y1={sideParam.lineCoords[1]}
          x2={sideParam.lineCoords[2]}
          y2={sideParam.lineCoords[3]}
        />
      )}
      {ticks.map(({ value, offset }) => (
        <g
          key={value}
          className="tick"
          transform={sideParam.transformGroup(offset)}
        >
          <line
            x2={sideParam.tickCoords[0]}
            y2={sideParam.tickCoords[1]}
            stroke="currentColor"
          />
          {gridLines && (
            <line
              x2={sideParam.gridCoords[0]}
              y2={sideParam.gridCoords[1]}
              stroke="currentColor"
              strokeOpacity={0.1}
              strokeDasharray="10,10"
            />
          )}
          <text
            key={value}
            x={sideParam.textCoords[0]}
            y={sideParam.textCoords[1]}
            style={{
              fontSize: "10px",
              textAnchor: sideParam.textAnchor,
            }}
            dy={sideParam.labelDy}
          >
            {stringFunc(value)}
          </text>
        </g>
      ))}
    </g>
  );
}
