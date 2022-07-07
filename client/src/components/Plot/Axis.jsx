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
  } = options;

  const sideParams = {
    bottom: {
      textAnchor: "middle",
      lineCoords: [range[0], 0, range[1], 0],
      transformGroup: (offset) => `translate(${offset},0)`,
      transformLabel: "translateY(20px)",
      tickCoords: [0, 6],
      labelDy: "0px",
    },
    top: {
      textAnchor: "middle",
      lineCoords: [range[0], 0, range[1], 0],
      transformGroup: (offset) => `translate(${offset},0)`,
      transformLabel: "translateY(-20px)",
      tickCoords: [0, -6],
      labelDy: "0px",
    },
    right: {
      textAnchor: "left",
      lineCoords: [0, range[0], 0, range[1]],
      transformGroup: (offset) => `translate(0,${offset})`,
      transformLabel: "translateX(20px)",
      tickCoords: [6, 0],
      labelDy: "5px",
    },
    left: {
      textAnchor: "right",
      lineCoords: [0, range[0], 0, range[1]],
      transformGroup: (offset) => `translate(0,${offset})`,
      transformLabel: "translateX(-20px)",
      tickCoords: [-6, 0],
      labelDy: "5px",
    },
  };

  const sideParam = sideParams[side];

  // create scale and determine ticks
  const ticks = useMemo(() => {
    const scale = scaleType().domain(domain).range(range);
    const width = range[1] - range[0];
    const numberOfTicksTarget = Math.max(1, Math.floor(width / pixelsPerTick));
    return scale
      .ticks(numberOfTicksTarget)
      .map((value) => ({ value, offset: scale(value) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domain.join("-"), range.join("-")]);

  return (
    <g transform="translate(5,5)">
      <line
        stroke="currentColor"
        className="domain"
        x1={sideParam.lineCoords[0]}
        y1={sideParam.lineCoords[1]}
        x2={sideParam.lineCoords[2]}
        y2={sideParam.lineCoords[3]}
      ></line>
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
          ></line>
          <text
            key={value}
            style={{
              fontSize: "10px",
              textAnchor: sideParam.textAnchor,
              transform: sideParam.transformLabel,
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
