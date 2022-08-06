import * as m from "@mui/material";
import * as mi from "@mui/icons-material";

import { NavLink } from "react-router-dom";

import "./index.scss";
import { useState } from "react";

const drawerWidth = 240;

export default function NavBar(props) {
  const { projects } = props;

  const [anchorElProject, setAnchorElProject] = useState(null);

  const handleOpenProjectMenu = (e) => setAnchorElProject(e.currentTarget);
  const handleCloseProjectMenu = (e) => setAnchorElProject(null);

  return (
    <m.Box sx={{ display: "flex" }}>
      <m.CssBaseline />
      <m.AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <m.Toolbar>
          <m.Box sx={{ display: "flex", gap: "10px", flexGrow: 1 }}>
            <NavLink
              to={"/"}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <m.Typography variant="h6" component="div">
                Linear Project Planning
              </m.Typography>
            </NavLink>
            <m.Box sx={{ flexGrow: 1 }}>
              <m.Button color="inherit" onClick={handleOpenProjectMenu}>
                select a project
              </m.Button>
              <m.Menu
                id="menu-appbar"
                anchorEl={anchorElProject}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElProject)}
                onClose={handleCloseProjectMenu}
              >
                {projects.map((project) => (
                  <m.MenuItem key={project.id} onClick={handleCloseProjectMenu}>
                    <NavLink
                      to={`/projects/${project.id}`}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      {project.name}
                    </NavLink>
                  </m.MenuItem>
                ))}
              </m.Menu>
            </m.Box>
          </m.Box>
          <m.Button variant="outlined" color="inherit">
            login
          </m.Button>
        </m.Toolbar>
      </m.AppBar>

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
            <m.ListItem>hello</m.ListItem>
          </m.List>
        </m.Box>
      </m.Drawer>
    </m.Box>
  );
}
