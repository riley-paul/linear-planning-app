import * as d3 from "d3";
import { useMemo } from "react";

export default function Axis(props) {
  const { domain, range } = props;

  const ticks = useMemo(() => {
    const scale = d3.scaleLinear().domain(domain).range(range);
    const width = Math.abs(range[1] - range[0]);
    const pixelsPerTick = 30;
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
            {value}
          </text>
        </g>
      ))}
    </g>
  );
}
