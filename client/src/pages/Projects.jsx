import { Button } from "@mui/material";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { deleteProjectHandler, loadProjectsHandler } from "../api/projects";
import ProjectCard from "../components/ProjectCard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleBar = styled.div`
  position: sticky;
  top: 56px;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.textSoft};
  margin-bottom: 20px;
  padding: 0 35px;
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  height: 48px;
  gap: 20px;
  z-index: 10;
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.text};
`;

const ProjectGrid = styled.div`
  padding: 5px 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export default function Projects(props) {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.currentProjects);

  const handleLoadProjects = loadProjectsHandler(dispatch);
  const handleDeleteProject = deleteProjectHandler(dispatch);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => handleLoadProjects(), []);

  return (
    <Container>
      <TitleBar>
        <Title>PROJECTS</Title>
        <Button
          size="small"
          color="inherit"
          children="Add project"
          component={Link}
          to="add"
        />
      </TitleBar>
      <ProjectGrid>
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            handleDelete={() => handleDeleteProject(project._id)}
          />
        ))}
      </ProjectGrid>
    </Container>
  );
}
