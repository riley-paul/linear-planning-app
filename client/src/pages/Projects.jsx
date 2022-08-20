import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ProjectCard from "../components/ProjectCard";
import http from "../utils/http";

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
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await http.get("/projects");
      setProjects(res.data);
    };
    fetchProjects();
  }, []);

  return (
    <Container>
      <TitleBar>
        <Title>PROJECTS</Title>
        <Button size="small" color="inherit" children="Add project" />
      </TitleBar>
      <ProjectGrid style={{ placeSelf: "center" }}>
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </ProjectGrid>
    </Container>
  );
}
