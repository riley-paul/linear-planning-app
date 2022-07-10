export default function RangeBar(props) {
  const { data, xScale, width, margin } = props;

  return (
    <g className="range-bar">
      {data.map((item) => {
        const width = Math.abs(xScale(item.KP_end) - xScale(item.KP_beg));
        const mid = width / 2;

        return (
          <g className="range-bar-item">
            <rect
              x={xScale(item.KP_beg)}
              height={16}
              width={width}
              fill={`rgb(${JSON.parse(item.colour)})`}
            />
            {width > 50 && (
              <text x={mid} y={8} dy="0.32em" fill="white">
                {item.text_shrt}
              </text>
            )}
          </g>
        );
      })}
      <line stroke="currentColor" x2={width - margin.right - margin.left} />
    </g>
  );
}
