import { useMemo } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { loadProjectHandler } from "../api/project";

import ElevationProfile from "../components/ElevationProfile";
import Map from "../components/Map";
import ProjectMenu from "../components/ProjectMenu";

const Container = styled.div`
  display: flex;
`;
const Wrapper = styled.div`
  width: 100%;
`;

export default function Project(props) {
  const { projectId } = useParams();

  const dispatch = useDispatch();
  const project = useSelector((state) => state.project.currentProject);

  const handleLoadProject = loadProjectHandler(dispatch);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => handleLoadProject(projectId), [projectId]);

  return (
    <Container>
      <ProjectMenu />
      <Wrapper>
        <ElevationProfile />
        <Map />
      </Wrapper>
    </Container>
  );
}
