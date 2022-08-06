import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import getTilesets from "./getTilesets";
import TileSwitcher from "./tileSwitcher";

export default function Map(props) {
  const tilesets = getTilesets();
  const [tilesetIndex, setTilesetIndex] = useState(0);

  return (
    <MapContainer center={[49.207665, -121.741593]} zoom={12}>
      <TileSwitcher
        options={tilesets}
        tilesetIndex={tilesetIndex}
        setTilesetIndex={setTilesetIndex}
      />
      <TileLayer
        url={tilesets[tilesetIndex].url}
        attribution={tilesets[tilesetIndex].attribution}
      />
    </MapContainer>
  );
}
