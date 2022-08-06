import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import "./tileSwitcher.scss";

export default function TileSwitcher(props) {
  const { options, tilesetIndex, setTilesetIndex } = props;

  return (
    <ToggleButtonGroup
      exclusive
      value={tilesetIndex}
      className="tileset-switcher"
    >
      {options.map((option, index) => (
        <ToggleButton key={index} value={index}>
          {option.name}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
