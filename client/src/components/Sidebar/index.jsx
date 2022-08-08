import * as m from "@mui/material";
import * as mi from "@mui/icons-material";
import { useState } from "react";
import Loading from "../Loading";
import { useEffect } from "react";

const drawerWidth = 240;

export default function Sidebar(props) {
  const { project, projectDisplay } = props;

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
        <m.List>
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
            <m.List component="div" disablePadding dense>
              {project.centerlines ? (
                project.centerlines.map((centerline) => (
                  <m.ListItemButton sx={{ pl: 4 }} key={centerline.id}>
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
              {project.takeoffs ? (
                project.takeoffs.map((takeoff) => (
                  <>
                    <m.ListItemButton>
                      <m.ListItemText
                        primary={takeoff.name}
                        secondary={takeoff.description}
                      />
                    </m.ListItemButton>
                    <m.Collapse in={takeoffOpen}>
                      <m.List dense disablePadding>
                        <m.RadioGroup>
                          {takeoff.revisions.map((revision) => (
                            <m.ListItemButton key={revision.id}>
                              <m.Radio size="small" />
                              <m.ListItemText
                                primary={revision.date_created}
                                secondary={revision.description}
                              />
                            </m.ListItemButton>
                          ))}
                        </m.RadioGroup>
                      </m.List>
                    </m.Collapse>
                  </>
                ))
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
