import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import http from "../helpers/http";

export default function Projects(props) {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    http
      .get("/projects")
      .then((res) => res.data)
      .then(
        (result) => {
          setIsLoaded(true);
          setProjects(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
        {projects.map((project) => (
          <NavLink
            style={({ isActive }) => ({
              display: "block",
              margin: "1rem 0",
              color: isActive ? "red" : "",
            })}
            to={`/projects/${project.id}`}
            key={project.id}
          >
            {project.name}
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}
