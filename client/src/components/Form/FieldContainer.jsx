import React from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.soft};
  background-color: ${({ theme }) => theme.bgDarker};

  padding: 15px;
  width: 100%;

  border-radius: 8px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.div`
  padding-bottom: 5px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 0.9em;
`;

export default function FieldContainer(props) {
  const { title, passProps = true } = props;

  const childrenWithProps = React.Children.map(props.children, (child) => {
    if (React.isValidElement(child))
      return React.cloneElement(child, { ...props });
    return child;
  });

  return (
    <Container>
      {title && <Title>{title.toUpperCase()}</Title>}
      {passProps ? childrenWithProps : props.children}
    </Container>
  );
}
