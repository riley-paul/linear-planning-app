import { useState, useRef } from "react";

export default function PanZoom(props) {
  const { xScale, xExtent, setXDomain } = props;
  const ref = useRef(null);

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

  // PANNING
  const [isPanning, setIsPanning] = useState(false);
  const [initialMousePos, setInitialMousePos] = useState({ x: 0, y: 0 });

  function mouseDown(event) {
    setIsPanning(true);
    setInitialMousePos({
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY,
    });

    ref.current.addEventListener("mouseup", mouseUp);
  }

  function mouseMove(event) {
    if (!isPanning) return;

    const mouseX = event.nativeEvent.offsetX;
    const valueX = xScale.invert(mouseX);
    const initialValueX = xScale.invert(initialMousePos.x);

    const deltaX = -(valueX - initialValueX);
    console.log(deltaX)

    setXDomain(prev => [prev[0] + deltaX, prev[1] + deltaX])
  }

  function mouseUp(event) {
    setIsPanning(false);
    ref.current.removeEventListener("mouseup", mouseUp);
  }

  return (
    <div
      className="pan-zoom"
      ref={ref}
      onWheel={zoom}
      onDoubleClick={() => setXDomain(xExtent)}
      onMouseDown={mouseDown}
      onMouseMove={mouseMove}
    >
      {props.children}
    </div>
  );
}
