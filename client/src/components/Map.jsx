import { useState } from "react";
import { MapContainer, TileLayer, GeoJSON, CircleMarker } from "react-leaflet";
import { useSelector } from "react-redux";

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

const lineStyle = { color: "red" };
const markerStyle = {
  pointToLayer: function (feature, latlng) {
    return (
      <CircleMarker
        center={latlng}
        options={{
          radius: 8,
          fillColor: "red",
          color: "white",
          opacity: 1,
          fillOpacity: 0.8,
          weight: 1,
        }}
      />
    );
  },
};

export default function Map(props) {
  const centerline = useSelector((state) => state.centerline.currentCenterline);
  const loading = useSelector((state) => state.centerline.loading);
  const error = useSelector((state) => state.centerline.error);

  const [tilesetIndex, setTilesetIndex] = useState(0);

  return (
    <MapContainer
      center={[49.207665, -121.741593]}
      zoom={12}
      style={{
        width: "100%",
        height: "calc(100vh - 56px - 250px - 1px)",
        zIndex: 1,
      }}
    >
      {centerline && <GeoJSON data={centerline.footprint} />}
      {centerline && <GeoJSON data={centerline.line} style={lineStyle} />}
      {centerline && <GeoJSON data={centerline.markers} style={markerStyle} />}
      <TileLayer
        url={tilesets[tilesetIndex].url}
        attribution={tilesets[tilesetIndex].attribution}
      />
    </MapContainer>
  );
}
