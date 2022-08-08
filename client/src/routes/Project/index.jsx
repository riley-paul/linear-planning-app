import http from "../../helpers/http";
import * as m from "@mui/material";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Map from "../../components/Map";
import Sidebar from "../../components/Sidebar";
import initialProjectDisplay from "./initialProjectDisplay";

export default function Project(props) {
  const [project, setProject] = useState({});
  const [projectDisplay, setProjectDisplay] = useState({});

  
  let { projectId } = useParams();
  
  useEffect(() => {
    http
    .get(`/projects/${projectId}`)
    .then((res) => setProject(res.data))
    .catch((err) => console.error(err.stack));
  }, [projectId]);
  
  useEffect(() => setProjectDisplay(initialProjectDisplay(project)), [project]);
  useEffect(() => console.log("project",project), [project]);

  return (
    <div>
      <m.Toolbar />
      <Sidebar
        project={project}
        projectDisplay={projectDisplay}
        setProjectDisplay={setProjectDisplay}
      />
      {/* <Map /> */}
    </div>
  );
}
