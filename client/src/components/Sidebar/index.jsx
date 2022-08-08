import * as m from "@mui/material";
import * as mi from "@mui/icons-material";
import { useState } from "react";
import Loading from "../Loading";
import { useEffect } from "react";

const drawerWidth = 240;

export default function Sidebar(props) {
  const { project, projectDisplay, setProjectDisplay } = props;

  const [centerlineOpen, setCenterlineOpen] = useState(true);
  const [takeoffOpen, setTakeoffOpen] = useState(true);

  useEffect(() => console.log(projectDisplay), [projectDisplay]);

  return (
    <m.Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <m.Toolbar />
      <m.Box sx={{ overflow: "auto" }}>
        <m.List disablePadding>
          <m.ListItemButton onClick={() => setCenterlineOpen((prev) => !prev)}>
            <m.ListItemText
              primary={
                <m.Typography style={{ fontWeight: "bold" }}>
                  CENTERLINES
                </m.Typography>
              }
            />
            {centerlineOpen ? <mi.ExpandLess /> : <mi.ExpandMore />}
          </m.ListItemButton>

          <m.Collapse in={centerlineOpen} timeout="auto" unmountOnExit>
            <m.List disablePadding dense>
              {project.centerlines ? (
                project.centerlines
                  .sort((a, b) =>
                    a.name < b.name ? 1 : b.name < a.name ? -1 : 0
                  )
                  .map((centerline) => (
                    <m.ListItemButton
                      // sx={{ pl: 4 }}
                      key={centerline.id}
                      selected={
                        projectDisplay.selectedCenterline === centerline.id
                      }
                      onClick={() =>
                        setProjectDisplay((prev) => ({
                          ...prev,
                          selectedCenterline: centerline.id,
                        }))
                      }
                    >
                      <m.ListItemText
                        primary={centerline.name}
                        secondary={centerline.description}
                      />
                    </m.ListItemButton>
                  ))
              ) : (
                <m.ListItem>
                  <Loading />
                </m.ListItem>
              )}
            </m.List>
          </m.Collapse>

          <m.Divider />

          <m.ListItemButton onClick={() => setTakeoffOpen((prev) => !prev)}>
            <m.ListItemText
              primary={
                <m.Typography style={{ fontWeight: "bold" }}>
                  TAKEOFFS
                </m.Typography>
              }
            />
            {takeoffOpen ? <mi.ExpandLess /> : <mi.ExpandMore />}
          </m.ListItemButton>

          <m.Collapse in={takeoffOpen} timeout="auto" unmountOnExit>
            <m.List disablePadding dense>
              {project.takeoffs && projectDisplay.takeoffs ? (
                project.takeoffs.map((takeoff) => {
                  const takeoffDisplay = projectDisplay.takeoffs.find(
                    // eslint-disable-next-line eqeqeq
                    (i) => i.id == takeoff.id
                  );

                  return (
                    <m.ListItemButton selected={takeoffDisplay.selected}>
                      <m.ListItemText
                        primary={takeoff.name}
                        secondary={takeoff.description}
                      />
                      {takeoff.revisions.length > 1 && <m.IconButton>
                        <mi.History/>
                      </m.IconButton>}
                    </m.ListItemButton>
                  );
                })
              ) : (
                <m.ListItem>
                  <Loading />
                </m.ListItem>
              )}
            </m.List>
          </m.Collapse>

          <m.Divider />
        </m.List>
      </m.Box>
    </m.Drawer>
  );
}
