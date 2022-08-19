import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

import { Button } from "@mui/material";
import { buttonSx } from "../utils/StyleOverrides";

import LinearScaleIcon from "@mui/icons-material/LinearScale";

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

export default function UserForm(props) {
  const { register } = props;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/signin", { email, password });
      console.log(res.data);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
  };

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
        <Button
          variant="outlined"
          onClick={register ? handleRegister : handleLogin}
          sx={{ ...buttonSx }}
        >
          {register ? "Register" : "Login"}
        </Button>
      </Wrapper>
    </Container>
  );
}
