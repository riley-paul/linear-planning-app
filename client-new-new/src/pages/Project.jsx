import { useParams } from "react-router-dom";
import styled from "styled-components";

import Menu from "../components/Menu";

const Container = styled.div`
  display: flex;
`
const Wrapper = styled.div``

export default function Project(props) {
  const { projectId } = useParams();

  return (
    <Container>
      <Menu></Menu>
      <Wrapper>
        Project
        {projectId}
      </Wrapper>
    </Container>
  );
}
