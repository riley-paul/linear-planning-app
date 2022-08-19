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
          <Button
            component={Link}
            to="projects"
            startIcon={<AccountTreeIcon />}
            sx={buttonSx}
            children="Projects"
          />

          <Button
            onClick={() => setDarkMode((prev) => !prev)}
            sx={buttonSx}
            children={darkMode ? "Light Mode" : "Dark Mode"}
          />

          <Button
            component={Link}
            to={"signin"}
            variant="outlined"
            sx={buttonSx}
            children="Login"
          />

          <Button
            to={"signup"}
            component={Link}
            variant="outlined"
            sx={buttonSx}
            children="Register"
          />
        </ButtonGroup>
      </Wrapper>
    </Container>
  );
}
