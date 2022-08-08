import http from "../helpers/http";
import * as m from "@mui/material";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Map from "../components/Map";

export default function Project(props) {
  const [project, setProject] = useState({});

  let { projectId } = useParams();

  useEffect(() => {
    http
      .get(`/projects/${projectId}`)
      .then((res) => {
        setProject(res.data);
      })
      .catch((err) => console.error(err.stack));
  }, [projectId]);

  useEffect(() => {
    console.log(project);
  }, [project]);

  return (
    <div>
      <m.Toolbar />
      {/* <Map /> */}
      Hello
    </div>
  );
}
