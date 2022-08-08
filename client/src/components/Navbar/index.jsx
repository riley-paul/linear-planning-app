import * as m from "@mui/material";

import { NavLink, useParams } from "react-router-dom";

import "./index.scss";
import { useState } from "react";
import { useEffect } from "react";

export default function NavBar(props) {
  const { projects } = props;
  const { projectId } = useParams();

  const [project, setProject] = useState({});

  useEffect(() => {
    // eslint-disable-next-line eqeqeq
    const proj = projects.find((proj) => proj.id == projectId);
    setProject(proj);
  }, [projectId, projects]);

  useEffect(() => {
    console.log(`Project changed to ${project?.name}`);
  }, [project]);

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
                {project?.name || "select a project"}
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
                {projects.map((proj) => (
                  <m.MenuItem key={proj.id} onClick={handleCloseProjectMenu}>
                    <NavLink
                      to={`/projects/${proj.id}`}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      {proj.name}
                    </NavLink>
                  </m.MenuItem>
                ))}
              </m.Menu>
            </m.Box>
          </m.Box>
          <m.Button disabled variant="outlined" color="inherit">
            login
          </m.Button>
        </m.Toolbar>
      </m.AppBar>
    </m.Box>
  );
}
