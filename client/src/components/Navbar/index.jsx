import {
  AppBar,
  Container,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import "./index.scss";

export default function NavBar(props) {
  return (
    <Box>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Linear Project Planning
            </Typography>
            <Button color="inherit">login</Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
