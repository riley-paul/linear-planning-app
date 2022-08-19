import { useEffect, useState } from "react";
import styled from "styled-components";
import ProjectCard from "../components/ProjectCard";
import http from "../helpers/http";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  padding: 5px 20px;
  `;

const Title = styled.h3`
  padding-bottom: 20px;
  `;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  align-items: center;
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
      <Wrapper>
        <Title>Projects</Title>
        <ProjectGrid style={{placeSelf: "center"}}>
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </ProjectGrid>
      </Wrapper>
    </Container>
  );
}
