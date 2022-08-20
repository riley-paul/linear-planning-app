import { useMemo } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { loadProjectHandler } from "../api/project";

import ElevationProfile from "../components/ElevationProfile";
import Map from "../components/Map";

const Container = styled.div`
  display: flex;
`;
const Wrapper = styled.div`
  width: 100%;
`;

const Menu = styled.div`
  height: calc(100vh - 56px);
  width: 240px;
  background-color: ${({ theme }) => theme.bg};
  position: sticky;
  top: 56px;
  overflow: auto;
`;

const MenuWrapper = styled.div`
  padding: 8px 20px;
`;

const Title = styled.h4`
  color: ${({ theme }) => theme.text};
  padding-bottom: 5px;
`;

const Desc = styled.p`
  color: ${({ theme }) => theme.textSoft};
  font-size: smaller;
`;

const Hr = styled.hr`
  border: 0;
  border-top: 1px solid ${({ theme }) => theme.soft};
  margin: 10px 0;
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
      <Menu>
        <MenuWrapper>
          <Title>{project.name}</Title>
          <Desc>{project.description}</Desc>
          <Hr />
          <div>Centerlines</div>
          <div>Takeoffs</div>
        </MenuWrapper>
      </Menu>
      <Wrapper>
        <ElevationProfile />
        <Map />
      </Wrapper>
    </Container>
  );
}
