import {
  CardContent,
  CardActions,
  Button,
  CardActionArea,
} from "@mui/material";

import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.textSoft};
  justify-self: center;
  width: calc(50% - 20px * 1 / 2);

  @media (min-width: 600px) {
    width: calc(33% - 20px * 2 / 3);
  }

  @media (min-width: 900px) {
    width: calc(25% - 20px * 3 / 4);
  }

  @media (min-width: 1200px) {
    width: calc(20% - 20px * 4 / 5);
  }

  box-shadow: ${({ theme }) => theme.boxShadow};
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 5px;
`;

const Title = styled.h4`
  color: ${({ theme }) => theme.text};
  padding-bottom: 5px;
`;
const Desc = styled.p`
  font-size: smaller;
`;

export default function ProjectCard(props) {
  const { project, handleDelete } = props;

  return (
    <Container>
      <CardActionArea component={Link} to={project.id.toString()}>
        <CardContent>
          <Title>{project.name}</Title>
          <Desc>{project.description}</Desc>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button color="inherit" size="small" children="edit" />
        <Button
          color="inherit"
          size="small"
          children="delete"
          onClick={handleDelete}
        />
      </CardActions>
    </Container>
  );
}
