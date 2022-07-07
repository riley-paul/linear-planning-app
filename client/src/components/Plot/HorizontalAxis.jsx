import * as d3 from "d3";
import { useMemo } from "react";

export default function HorizontalAxis(props) {
  const { domain, range, options = {} } = props;

  const {
    scaleType = d3.scaleLinear,
    stringFunc = (i) =>
      i.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }),
    pixelsPerTick = 30,
  } = options;

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
    <g>
      <line className="domain" x1={domain[0]} x2={domain[1]}></line>
      {ticks.map(({ value, offset }) => (
        <g key={value} transform={`translate(${offset},0)`}>
          <line y2="6" stroke="currentColor"></line>
          <text
            key={value}
            style={{
              fontSize: "10px",
              textAnchor: "middle",
              transform: "translateY(20px)",
            }}
          >
            {stringFunc(value)}
          </text>
        </g>
      ))}
    </g>
  );
}
