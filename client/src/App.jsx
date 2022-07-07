import Axis from "./components/Plot/Axis";
import Map from "./components/Map";

export default function App() {
  return (
    <div className="App">
      <svg>
        <Axis range={[0, 200]} domain={[1000, 1500]} />
      </svg>
      {/* <Map />   */}
    </div>
  );
}
