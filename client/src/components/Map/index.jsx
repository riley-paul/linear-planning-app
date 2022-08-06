import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function Map(props) {
  return (
    <MapContainer center={[49.207665, -121.741593]} zoom={12}>
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
        attribution='Tiles &copy; Esri'
      />
    </MapContainer>
  );
}
