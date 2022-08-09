import http from "../../helpers/http";
import * as m from "@mui/material";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Map from "../../components/Map";
import Sidebar from "../../components/Sidebar";
import initialProjectDisplay from "./initialProjectDisplay";
import ElevationProfile from "../../components/ElevationProfile";

export default function Project(props) {
  const [project, setProject] = useState({});

  let { projectId } = useParams();

  useEffect(() => {
    http
      .get(`/projects/${projectId}`)
      .then((res) => setProject(initialProjectDisplay(res.data)))
      .catch((err) => console.error(err.stack));
  }, [projectId]);

  useEffect(() => console.log("project", project), [project]);

  return (
    <m.Box sx={{ display: "flex" }}>
      <Sidebar project={project} setProject={setProject} />
      <m.Box component="main" sx={{ flexGrow: 1 }}>
        <m.Toolbar />
        <ElevationProfile project={project} />
        <m.Divider />
        <Map />
      </m.Box>
    </m.Box>
  );
}
