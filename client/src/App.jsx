import Map from "./components/Map";
import Axis from "./components/Plot/Axis";

export default function App() {
  return (
    <div className="App">
      <svg>
        <Axis
          range={[0, 200]}
          domain={[1000, 1500]}
          options={{ side: "left" }}
        />
      </svg>
      {/* <Map />   */}
    </div>
  );
}
