import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar";
import * as m from "@mui/material";
import http from "./helpers/http";
import axios from "axios";

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    http
      .get("/projects")
      .then((res) => {
        console.log(res);
        setProjects(res.data);
      })
      .catch((err) => console.error("could not get projects", err));
  }, []);

  useEffect(() => console.log("projects", projects), [projects]);

  return (
    <div>
      <m.CssBaseline />
      <NavBar projects={projects} />
      <Outlet />
    </div>
  );
}
