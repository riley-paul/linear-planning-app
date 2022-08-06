import * as m from "@mui/material";
import * as mi from "@mui/icons-material";
import * as React from "react";

import "./index.scss";

const drawerWidth = 240;

export default function NavBar(props) {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <m.Box sx={{ display: "flex" }}>
      <m.CssBaseline />
      <m.AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <m.Toolbar>
          <m.IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <mi.Menu />
          </m.IconButton>
          <m.Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Linear Project Planning
          </m.Typography>
          <m.Box sx={{display: "flex", gap: "10px"}}>
            <m.Button color="inherit">projects</m.Button>
            <m.Button variant="outlined" color="inherit">login</m.Button>
          </m.Box>
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
            <m.ListItem>
              <m.FormControl fullWidth>
                <m.InputLabel id="demo-simple-select-label">Age</m.InputLabel>
                <m.Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <m.MenuItem value={10}>Ten</m.MenuItem>
                  <m.MenuItem value={20}>Twenty</m.MenuItem>
                  <m.MenuItem value={30}>Thirty</m.MenuItem>
                </m.Select>
              </m.FormControl>
            </m.ListItem>
          </m.List>
        </m.Box>
      </m.Drawer>
    </m.Box>
  );
}
