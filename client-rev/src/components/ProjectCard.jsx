import {
  Card,
  CardContent,
  CardActions,
  Button,
  CardActionArea,
} from "@mui/material";

import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${({ theme }) => theme.bg};
  min-width: 250px;
  max-width: 345px;
  justify-self: center;
`;

const Title = styled.h4`
  color: ${({ theme }) => theme.text};
  padding-bottom: 5px;
`;
const Desc = styled.p`
  color: ${({ theme }) => theme.textSoft};
  font-size: smaller;
`;

export default function ProjectCard(props) {
  const { project } = props;

  return (
    <Container>
      <Card sx={{ backgroundColor: "inherit", color: "inherit" }}>
        <CardActionArea component={Link} to={project._id}>
          <CardContent>
            <Title>{project.name}</Title>
            <Desc>{project.description}</Desc>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            component={Link}
            to={project._id}
            color="inherit"
            children="view"
          />
          <Button color="inherit" children="edit" />
        </CardActions>
      </Card>
    </Container>
  );
}
