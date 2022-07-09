export default function PanZoom(props) {
  const { xScale, xExtent, setXDomain } = props;

  function zoom(event) {
    const mouseX = event.nativeEvent.offsetX;
    const valueX = xScale.invert(mouseX);
    const factor = 1 - 1.3 / -event.nativeEvent.deltaY;

    setXDomain((prev) => {
      const w1 = Math.abs(valueX - prev[0]);
      const w2 = Math.abs(valueX - prev[1]);

      const newW1 = w1 * factor;
      const newW2 = w2 * factor;

      return [
        Math.max(xExtent[0], valueX - newW1),
        Math.min(xExtent[1], valueX + newW2),
      ];
    });
  }

  return (
    <div
      className="pan-zoom"
      onWheel={zoom}
      onDoubleClick={() => setXDomain(xExtent)}
    >
      {props.children}
    </div>
  );
}
