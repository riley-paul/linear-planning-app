import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar";
import http from "./helpers/http";
import * as m from "@mui/material";

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    http
      .get("/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err.stack));
  }, []);

  useEffect(() => console.log(projects), [projects]);

  return (
    <div>
      <m.CssBaseline />
      <NavBar projects={projects} />
      <Outlet />
    </div>
  );
}
