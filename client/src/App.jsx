import mapboxgl from "mapbox-gl";
import { useRef, useState, useEffect } from "react";

mapboxgl.accessToken =
  "pk.eyJ1IjoicmpwMzAxIiwiYSI6ImNsMWdwdjF6YjFjN2EzZHBjeWl4MnUyeXUifQ.s-5QTZX7xeofw36iclsJZA";

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  return <div className="App">
    <div ref={mapContainer} className="map-container"></div>
  </div>;
}
