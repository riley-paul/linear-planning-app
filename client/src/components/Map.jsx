import axios from "axios";
import mapboxgl from "mapbox-gl";
import { useRef, useState, useEffect } from "react";
import * as turf from "@turf/turf";

import "./Map.scss";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_PK;

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [lng, setLng] = useState(-121.4417);
  const [lat, setLat] = useState(49.3795);
  const [zoom, setZoom] = useState(14);

  const [CL, setCL] = useState(null);

  // Initial map load
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  // Fetch data and add to map
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    Promise.all([
      axios.get("http://localhost:8080/cl"),
      axios.get("http://localhost:8080/kps"),
    ]).then((all) => {
      const cl = all[0].data;
      const kps = all[1].data;

      const styling = {
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#f54242",
          "line-width": 4,
          "circle-color": "#F84C4C", // red color
        },
      };

      map.current.on("load", () => {
        map.current.addSource("CL", { type: "geojson", data: cl });
        map.current.addSource("KPs", { type: "geojson", data: kps });

        map.current.addLayer({
          id: "CL",
          type: "line",
          source: "CL",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#f54242",
            "line-width": 4,
          },
        });

        map.current.addLayer({
          id: "KPs",
          type: "symbol",
          source: "KPs",
          layout: {
            "text-field": ["get", "Descrip"],
            "text-anchor": "left"
          },
        });

        // map.current.addSource("mousePos", {
        //   type: "geojson",
        //   data: {
        //     type: "Feature",
        //     geometry: {
        //       type: "Point",
        //       coordinates: [0, 0],
        //     },
        //   },
        // });

        // map.current.addLayer({
        //   id: "mousePos",
        //   type: "circle",
        //   source: "mousePos",
        //   ...styling,
        // });
      });
    });
  }, []);

  // Add event listeners
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on("mousemove", (e) => {
      if (!CL) return;
      const mouse = turf.point([e.lngLat.lng, e.lngLat.lat]);
      const snapped = turf.nearestPointOnLine(CL, mouse);
      map.current.getSource("mousePos").setData(turf.truncate(snapped));
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
