import * as m from "@mui/material";
import * as mi from "@mui/icons-material";
import { useState } from "react";
import Loading from "../Loading";

export default function CollapsingList(props) {
  const { heading = "heading", loading = true, contentFunction } = props;

  const [open, setOpen] = useState(true);

  return (
    <m.Box>
      <m.ListItemButton onClick={() => setOpen((prev) => !prev)}>
        <m.ListItemText
          primary={
            <m.Typography style={{ fontWeight: "bold" }}>
              {heading.toUpperCase()}
            </m.Typography>
          }
        />
        {open ? <mi.ExpandLess /> : <mi.ExpandMore />}
      </m.ListItemButton>

      <m.Collapse in={open} timeout="auto" unmountOnExit>
        <m.List disablePadding dense>
          {loading || !contentFunction ? (
            <m.ListItem>
              <Loading />
            </m.ListItem>
          ) : (
            contentFunction()
          )}
        </m.List>
      </m.Collapse>

      <m.Divider />
    </m.Box>
  );
}
