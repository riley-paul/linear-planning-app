import styled from "styled-components";
import React, { useState } from "react";
import FieldContainer from "./FieldContainer";
import { useNavigate } from "react-router-dom";

import LoadingButton from "@mui/lab/LoadingButton";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Wrapper = styled.div`
  width: 40%;
  max-width: 600px;
  min-width: 400px;
  padding-top: 20px;

  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Title = styled.h4`
  padding-bottom: 5px;
`;

export default function Form(props) {
  const {
    onSubmission,
    title,
    loading,
    error,
    actionName = "submit",
    redirect = "",
  } = props;
  const [state, setState] = useState({});
  const navigate = useNavigate();

  return (
    <Container>
      <Wrapper>
        {title && <Title>{title.toUpperCase()}</Title>}
        {React.Children.map(props.children, (child) => {
          if (React.isValidElement(child))
            return React.cloneElement(child, { state, setState });
          return child;
        })}
        <FieldContainer passProps={false}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <LoadingButton
              loading={loading}
              onClick={(e) => {
                onSubmission(e, state);
                navigate(redirect);
              }}
              children={actionName}
              variant="contained"
              sx={{ width: "100%" }}
            />
          </div>
          {error && (
            <div
              style={{
                color: "red",
                fontSize: "0.8em",
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
              children="Could not complete action"
            />
          )}
        </FieldContainer>
      </Wrapper>
    </Container>
  );
}
