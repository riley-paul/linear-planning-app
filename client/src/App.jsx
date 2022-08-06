import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar";
import http from "./helpers/http";

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    http
      .get("/projects")
      .then((res) => {
        setProjects(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err.stack));
  }, []);

  return (
    <div>
      <NavBar projects={projects} />
      <Outlet />
    </div>
  );
}
