export default function RangeBar(props) {
  const {
    data = { name: "", dataset: [] },
    xScale,
    width,
    margin,
    transform = "translate(0,0)",
    rangeHeight,
  } = props;

  return (
    <g className="range-bar" transform={transform}>
      {data.dataset.map((item, index) => {
        const width = Math.abs(xScale(item.chainage_end) - xScale(item.chainage_beg));
        const mid = width / 2;

        return (
          <g
            key={index}
            className="range-bar-item"
            transform={`translate(${xScale(item.chainage_beg)},0)`}
          >
            <rect
              height={rangeHeight}
              width={width}
              // fill={`rgb(${JSON.parse(item.colour)})`}
            />
            {width > 50 && (
              <text
                x={mid}
                y={rangeHeight / 2}
                dy="0.32em"
                fill="white"
                textAnchor="middle"
              >
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
