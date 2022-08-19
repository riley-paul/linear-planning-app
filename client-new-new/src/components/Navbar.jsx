import styled from "styled-components";
import { Link } from "react-router-dom";

import { Button } from "@mui/material";

import AccountTreeIcon from "@mui/icons-material/AccountTree";
import LinearScaleIcon from "@mui/icons-material/LinearScale";

import { buttonSx, linkStyle } from "../utils/StyleOverrides";

const Container = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgDarker};
  color: ${({ theme }) => theme.text};
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0px 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  color: ${({ theme }) => theme.textSoft};
`;

const Title = styled.h3`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export default function Navbar(props) {
  const { setDarkMode, darkMode } = props;

  return (
    <Container>
      <Wrapper>
        <div className="left">
          <Link to="" style={linkStyle}>
            <Title>
              <LinearScaleIcon fontSize="large" sx={{ color: "crimson" }} />
              Linear Planning App
            </Title>
          </Link>
        </div>

        <ButtonGroup className="right">
          <Link to="projects" style={linkStyle}>
            <Button startIcon={<AccountTreeIcon />} sx={buttonSx}>
              Projects
            </Button>
          </Link>

          <Button onClick={() => setDarkMode((prev) => !prev)} sx={buttonSx}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </Button>

          <Link to={"signin"} style={linkStyle}>
            <Button variant="outlined" sx={buttonSx}>
              Login
            </Button>
          </Link>

          <Link to={"signup"} style={linkStyle}>
            <Button variant="outlined" sx={buttonSx}>
              Register
            </Button>
          </Link>
        </ButtonGroup>
      </Wrapper>
    </Container>
  );
}
