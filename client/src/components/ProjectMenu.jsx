import { useSelector } from "react-redux";
import styled from "styled-components";

import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListSubheader,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

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
  display: flex;
  justify-content: space-between;
  align-items: center;
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
        <Title>
          CENTERLINES
          <IconButton
            size="small"
            color="inherit"
            children={<AddIcon />}
            component={Link}
            to="add-centerline"
          />
        </Title>
        {project.centerlines.map((centerline) => {
          <div>{centerline.name}</div>;
        })}

        <Hr />
        <Title>
          TAKEOFFS
          <IconButton
            size="small"
            color="inherit"
            children={<AddIcon />}
            component={Link}
            to="add-takeoff"
          />
        </Title>
        {project.takeoffs.map((takeoff) => {
          <div>{takeoff.name}</div>;
        })}
      </Wrapper>
    </Container>
  );
}
