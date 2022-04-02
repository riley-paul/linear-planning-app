import mapboxgl from "mapbox-gl";
import { useRef, useState, useEffect } from "react";

import "./Map.scss";

mapboxgl.accessToken =
  "pk.eyJ1IjoicmpwMzAxIiwiYSI6ImNsMWdwdjF6YjFjN2EzZHBjeWl4MnUyeXUifQ.s-5QTZX7xeofw36iclsJZA";

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [lng, setLng] = useState(-121.4417);
  const [lat, setLat] = useState(49.3795);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </>
  );
}
