import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Button, CircularProgress } from "@mui/material";

import LinearScaleIcon from "@mui/icons-material/LinearScale";
import { loginHandler, registerHandler } from "../api/auth";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};

  border-radius: 5px;
  padding: 20px 40px;
  gap: 10px;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  outline: none;
  color: inherit;
  padding: 10px;
  background-color: transparent;
  width: 100%;
`;

const Message = styled.div`
  color: ${({ failure }) => (failure ? "crimson" : "inherit")};
  font-size: small;
`;

function LoginButton({ userState, onClick }) {
  return (
    <>
      {userState.loading ? (
        <CircularProgress />
      ) : !userState.currentUser ? (
        <Button
          variant="outlined"
          onClick={onClick}
          color="inherit"
          children="Login"
        />
      ) : (
        <Message children={`Logged in as ${userState.currentUser.name}`} />
      )}
      {userState.error && <Message children="Login Failed" />}
    </>
  );
}

function RegisterButton({ userState, onClick }) {
  return (
    <>
      {userState.loading ? (
        <CircularProgress />
      ) : !userState.currentUser ? (
        <Button
          variant="outlined"
          onClick={onClick}
          color="inherit"
          children="Register"
        />
      ) : (
        <Message children={`Logged in as ${userState.currentUser.name}`} />
      )}
      {userState.error && <Message children="Login Failed" />}
    </>
  );
}

export default function UserForm(props) {
  const { register } = props;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const handleLogin = loginHandler(dispatch, { email, password });
  const handleRegister = registerHandler(dispatch, { name, email, password });

  return (
    <Container>
      <Wrapper>
        <LinearScaleIcon fontSize="large" sx={{ color: "crimson" }} />
        {register && (
          <Input
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {register ? (
          <RegisterButton userState={userState} onClick={handleRegister} />
        ) : (
          <LoginButton userState={userState} onClick={handleLogin} />
        )}
      </Wrapper>
    </Container>
  );
}
