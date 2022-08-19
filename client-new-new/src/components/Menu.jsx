import styled from "styled-components"

const Container = styled.div`
  height: calc(100vh - 56px);
  width: 240px;
  background-color: ${({ theme }) => theme.bg};
  position: sticky;
  top: 56px;
`

export default function Menu(props) {

  return (
    <Container>
      Menu
    </Container>
  )
}