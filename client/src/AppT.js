import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu2";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Teachers from "./pages/Teachers";
import Modules from "./pages/Modules";
import CreateModules from "./pages/CreateModules";
import Profile from "./pages/profileTeacher";
import CreateChapter from "./pages/CreateChapter";
import { useState } from "react";

const Container = styled.div`
  display: flex;
`;
const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.soft};
`;
const Wrapper = styled.div`
  padding: 22px 96px;
`;

function AppT(props) {
  const { id_user } = props;
  const [darkMode, setDarkMode] = useState(false);
  // for the page Teacher

  return (
    <ThemeProvider theme={darkMode ? lightTheme : darkTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Profile isLightMode={darkMode} setIsLightMode={setDarkMode} />} />
                  <Route
                    path="Teachers/:IdT"
                    element={<Teachers isLightMode={darkMode} setIsLightMode={setDarkMode} />}
                  />
                  <Route path="/createModules" element={<CreateModules isLightMode={darkMode} setIsLightMode={setDarkMode} />} />
                  <Route path="/createModules/Chapter/:courseId/:nameM" element={<CreateChapter isLightMode={darkMode} setIsLightMode={setDarkMode} />} />
                  <Route path="/Modules/:courseId/:nameM/:firstName/:lastName" element={<Modules isLightMode={darkMode} setIsLightMode={setDarkMode} />} />
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default AppT;