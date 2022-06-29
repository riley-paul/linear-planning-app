import { useRef, useState, useEffect } from "react";

import * as turf from "@turf/turf";

import axios from "axios";
import mapboxgl from "mapbox-gl";

import "./Map.scss";

// mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_PK;
// const API_URL = process.env.REACT_APP_API_URL;
mapboxgl.accessToken = "pk.eyJ1IjoicmpwMzAxIiwiYSI6ImNsMWdwdjF6YjFjN2EzZHBjeWl4MnUyeXUifQ.s-5QTZX7xeofw36iclsJZA";
const API_URL = "http://localhost:8080/projects";

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
      axios.get(`${API_URL}/CNTRLINE.geojson`),
      axios.get(`${API_URL}/MRKRS.geojson`),
      axios.get(`${API_URL}/FTPRINT.geojson`),
    ])
      .then((all) => {
        const cl = all[0].data;
        const kps = all[1].data;
        const fp = all[2].data;

        map.current.on("load", () => {
          map.current.addSource("CL", { type: "geojson", data: cl });
          map.current.addSource("KPs", { type: "geojson", data: kps });
          map.current.addSource("FP", { type: "geojson", data: fp });

          map.current.addLayer({
            id: "FP",
            type: "fill",
            source: "FP",
            paint: {
              "fill-opacity": 0.5,
              "fill-color": [
                "match",
                ["get", "FPType"],
                "Extra Temporary Workspace",
                "#AA66CD",
                "Temporary Workspace",
                "#E8BEFF",
                "Log Deck",
                "#A3FF73",
                "#ccc",
              ],
            },
          });

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
              "text-anchor": "left",
              "text-offset": [1, 0],
              "text-size": 12,
            },
          });

          map.current.addLayer({
            id: "KPs_markers",
            type: "circle",
            source: "KPs",
            paint: {
              "circle-stroke-width": 1,
              "circle-stroke-color": "#ffffff",
            },
          });

          map.current.addSource("mousePos", {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [0, 0],
              },
            },
          });

          map.current.addLayer({
            id: "mousePos",
            type: "circle",
            source: "mousePos",
            paint: {
              "circle-stroke-width": 3,
              "circle-stroke-color": "#ffffff",
            },
          });
        });
      })
      .catch((err) => {
        console.log("Could not fetch data from server");
        console.error(err);
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
      return;
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
