import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../helpers/http";

export default function Projects(props) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await http.get("/projects");
      setProjects(res.data);
    };
    fetchProjects();
  }, []);

  return (
    <div>
      Projects
      {projects.map((project) => (
        <Link to={project._id} key={project._id}>
          {project.name}
        </Link>
      ))}
    </div>
  );
}
