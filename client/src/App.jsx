import Map from "./components/Map";
import ElevationProfile from "./components/ElevationProfile";

export default function App() {
  return (
    <div className="App" style={{ margin: "10px" }}>
      <ElevationProfile />
      <Map />
    </div>
  );
}
