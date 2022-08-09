import * as m from "@mui/material";
import * as mi from "@mui/icons-material";
import CollapsingList from "./CollapsingList";
import { useEffect } from "react";

const drawerWidth = 240;

export default function Sidebar(props) {
  const { project, projectDisplay, setProjectDisplay } = props;

  useEffect(
    () => console.log("projectDisplay", projectDisplay),
    [projectDisplay]
  );

  function takeoffMap() {
    return project.takeoffs.map((takeoff) => {
      const takeoffDisplay = projectDisplay.takeoffs.find(
        // eslint-disable-next-line eqeqeq
        (i) => i.id == takeoff.id
      );

      const onclick = () =>
        setProjectDisplay((prev) => ({
          ...prev,
          takeoffs: [
            ...prev.takeoffs.filter((i) => i.id != takeoff.id),
            {
              ...takeoffDisplay,
              selected: !takeoffDisplay.selected,
            },
          ],
        }));

      return (
        <m.ListItemButton
          selected={takeoffDisplay.selected}
          key={takeoff.id}
          onClick={onclick}
        >
          <m.ListItemText
            primary={takeoff.name}
            secondary={takeoff.description}
          />
          {takeoff.revisions.length > 1 && (
            <m.IconButton>
              <mi.History />
            </m.IconButton>
          )}
        </m.ListItemButton>
      );
    });
  }

  function centerlineMap() {
    return project.centerlines
      .sort((a, b) => (a.name < b.name ? 1 : b.name < a.name ? -1 : 0))
      .map((centerline) => (
        <m.ListItemButton
          key={centerline.id}
          selected={projectDisplay.selectedCenterline === centerline.id}
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
      ));
  }

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
          <CollapsingList
            heading="centerlines"
            loading={!project.hasOwnProperty("centerlines")}
            contentFunction={centerlineMap}
          ></CollapsingList>

          <CollapsingList
            heading="takeoffs"
            loading={
              !project.hasOwnProperty("takeoffs") ||
              !projectDisplay.hasOwnProperty("takeoffs") ||
              projectDisplay.takeoffs.length !== project.takeoffs.length
            }
            contentFunction={takeoffMap}
          />
        </m.List>
      </m.Box>
    </m.Drawer>
  );
}
