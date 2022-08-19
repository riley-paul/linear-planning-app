import {
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  CardActionArea,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { Link } from "react-router-dom";
import { linkStyle } from "../utils/StyleOverrides";

export default function ProjectCard(props) {
  const { project } = props;

  return (
    <Card>
      <CardActionArea component={Link} to={project._id}>
        <CardContent>{project.name}</CardContent>
      </CardActionArea>
      <CardActions>
        <Button>View</Button>
        <Button>View</Button>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
