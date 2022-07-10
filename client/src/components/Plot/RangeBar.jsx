export default function RangeBar(props) {
  const {
    data = { name: "", entries: [] },
    xScale,
    width,
    margin,
    transform = "translate(0,0)",
  } = props;

  return (
    <g className="range-bar" transform={transform}>
      {data.entries.map((item,index) => {
        const width = Math.abs(xScale(item.KP_end) - xScale(item.KP_beg));
        const mid = width / 2;

        return (
          <g
            key={index}
            className="range-bar-item"
            transform={`translate(${xScale(item.KP_beg)},0)`}
          >
            <rect
              height={16}
              width={width}
              fill={`rgb(${JSON.parse(item.colour)})`}
            />
            {width > 50 && (
              <text x={mid} y={8} dy="0.32em" fill="white" textAnchor="middle">
                {item.text_shrt}
              </text>
            )}
          </g>
        );
      })}
      <line stroke="currentColor" x1={margin.left} x2={width - margin.right} />
    </g>
  );
}
