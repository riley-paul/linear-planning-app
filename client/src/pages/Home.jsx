import styled from "styled-components";

const Container = styled.div`
  height: calc(100vh - 56px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Home(props) {
  return <Container>Welcome</Container>;
}
