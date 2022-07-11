import { useState, useRef } from "react";

export default function PanZoom(props) {
  const { xScale, xExtent, setXDomain, xDomain } = props;
  const ref = useRef(null);

  function zoom(event) {
    if (!event.nativeEvent.deltaY) return;

    const mouseX = event.nativeEvent.offsetX;
    const valueX = xScale.invert(mouseX);
    const factor = 1 + 1 / event.nativeEvent.deltaY;

    const minWidth = 300;

    setXDomain((prev) => {
      const w1 = Math.abs(valueX - prev[0]);
      const w2 = Math.abs(valueX - prev[1]);

      const newW1 = w1 * factor;
      const newW2 = w2 * factor;

      const newXDomain = [
        Math.max(xExtent[0], valueX - newW1),
        Math.min(xExtent[1], valueX + newW2),
      ];

      return Math.abs(newXDomain[0] - newXDomain[1]) > minWidth
        ? newXDomain
        : prev;
    });
  }

  // PANNING
  const [isPanning, setIsPanning] = useState(false);
  const [initialMousePos, setInitialMousePos] = useState({ x: 0, y: 0 });
  const [initalXDomain, setInitialXDomain] = useState([null, null]);

  function mouseDown(event) {
    setIsPanning(true);
    setInitialMousePos({
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY,
    });
    setInitialXDomain(xDomain);

    ref.current.addEventListener("mouseup", mouseUp);
  }

  function mouseMove(event) {
    event.preventDefault();
    if (!isPanning) return;

    const mouseX = event.nativeEvent.offsetX;
    const valueX = xScale.invert(mouseX);
    const initialValueX = xScale.invert(initialMousePos.x);

    const deltaX = -(valueX - initialValueX);

    const newDomain = [initalXDomain[0] + deltaX, initalXDomain[1] + deltaX];

    const validDomain =
      newDomain[0] >= xExtent[0] && newDomain[1] <= xExtent[1];

    setXDomain((prev) => (validDomain ? newDomain : prev));
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
