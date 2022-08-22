import { useSelector } from "react-redux";
import styled from "styled-components";

import { List, ListItem, ListItemButton, ListSubheader } from "@mui/material";

const Container = styled.div`
  height: calc(100vh - 56px);
  width: 240px;
  background-color: ${({ theme }) => theme.bg};
  position: sticky;
  top: 56px;
  overflow: auto;
`;

const Wrapper = styled.div`
  padding: 20px;
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
  margin: 12px 0;
`;

export default function ProjectContainer(props) {
  const project = useSelector((state) => state.project.currentProject);

  return (
    <Container>
      <Wrapper>
        <Title>{project.name}</Title>
        <Desc>{project.description}</Desc>
        <Hr />
        <List dense>
          <ListSubheader>header</ListSubheader>
          <ListItem children="hello" />
          <ListItem children="hello" />
          <ListItem children="hello" />
          <ListItem children="hello" />
          <ListItem children="hello" />
          <ListItem children="hello" />
          <ListItem children="hello" />
        </List>
      </Wrapper>
    </Container>
  );
}
