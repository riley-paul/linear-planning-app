import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import styled from "styled-components";
import getTilesets from "./Map/getTilesets";
import Helmet from "react-helmet";

const tilesets = [
  {
    name: "Topographic",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri",
  },
  {
    name: "Street",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  {
    name: "Satellite",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri",
  },
];

export default function Map(props) {
  const tilesets = getTilesets();
  const [tilesetIndex, setTilesetIndex] = useState(0);

  return (
    <MapContainer
      center={[49.207665, -121.741593]}
      zoom={12}
      style={{ width: "100%", height: "calc(100vh - 56px - 250px - 1px)" }}
    >
      <TileLayer
        url={tilesets[tilesetIndex].url}
        attribution={tilesets[tilesetIndex].attribution}
      />
    </MapContainer>
  );
}
