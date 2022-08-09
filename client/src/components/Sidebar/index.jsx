import * as m from "@mui/material";
import * as mi from "@mui/icons-material";
import CollapsingList from "./CollapsingList";

const drawerWidth = 240;

export default function Sidebar(props) {
  const { project, setProject } = props;

  function takeoffMap() {
    return project.takeoffs
      .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
      .map((takeoff) => {
        return (
          <m.ListItemButton
            selected={takeoff.selected}
            key={takeoff.id}
            onClick={() =>
              setProject((prev) => ({
                ...prev,
                takeoffs: [
                  ...prev.takeoffs.filter((i) => i.id !== takeoff.id),
                  { ...takeoff, selected: !takeoff.selected },
                ],
              }))
            }
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
          selected={project.centerline.id === centerline.id}
          onClick={() => setProject((prev) => ({ ...prev, centerline }))}
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
            loading={!project.hasOwnProperty("takeoffs")}
            contentFunction={takeoffMap}
          />
        </m.List>
      </m.Box>
    </m.Drawer>
  );
}
