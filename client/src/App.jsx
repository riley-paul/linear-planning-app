import styled, { ThemeProvider } from "styled-components";

import Navbar from "./components/Navbar";
import Projects from "./pages/Projects";
import Project from "./pages/Project";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { darkTheme, lightTheme } from "./utils/Theme";

import { useState } from "react";
import { Helmet } from "react-helmet";

import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import AddProject from "./pages/AddProject";
import AddCenterline from "./pages/AddCenterline";
import AddTakeoff from "./pages/AddTakeoff";
import Login from "./pages/Login";
import Register from "./pages/Register";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div``;

const Main = styled.div``;

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <style>{`body {
          background-color: ${theme.bgLighter};
          color: ${theme.text};
          }`}</style>
      </Helmet>
      <BrowserRouter>
        <Container>
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home />} />
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="projects">
                    <Route index element={<Projects />} />
                    <Route path="add" element={<AddProject />} />
                    <Route path=":projectId">
                      <Route index element={<Project />} />
                      <Route path="add-centerline" element={<AddCenterline />} />
                      <Route path="add-takeoff" element={<AddTakeoff />} />
                    </Route>
                    <Route path="*" element={<NoMatch />} />
                  </Route>
                  <Route path="*" element={<NoMatch />} />
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}
