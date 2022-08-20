import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@mui/material";

import AccountTreeIcon from "@mui/icons-material/AccountTree";
import LinearScaleIcon from "@mui/icons-material/LinearScale";

import { linkStyle } from "../utils/StyleOverrides";
import { logoutHandler } from "../api/auth";

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

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleLogout = logoutHandler(dispatch);

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
          {currentUser && (
            <Button
              component={Link}
              to="projects"
              startIcon={<AccountTreeIcon />}
              children="Projects"
              color="inherit"
            />
          )}

          <Button
            onClick={() => setDarkMode((prev) => !prev)}
            color="inherit"
            children={darkMode ? "Light Mode" : "Dark Mode"}
          />

          {currentUser ? (
            <Button
              component={Link}
              to={""}
              onClick={handleLogout}
              variant="outlined"
              color="inherit"
              children="Logout"
            />
          ) : (
            <>
              <Button
                component={Link}
                to={"login"}
                variant="outlined"
                color="inherit"
                children="Login"
              />

              <Button
                to={"register"}
                component={Link}
                variant="outlined"
                color="inherit"
                children="Register"
              />
            </>
          )}
        </ButtonGroup>
      </Wrapper>
    </Container>
  );
}
