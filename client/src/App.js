import styled, { ThemeProvider } from "styled-components"
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Teachers from "./pages/Teachers";
import Modules from "./pages/Modules";
import CreateModules from "./pages/CreateModules";
import Profile from "./pages/Profile";
import { loginSuccess } from "./redux/userslice";

const Container = styled.div`
  display: flex;
`;
const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.soft};
`
const Wrapper = styled.div`
  padding: 22px 96px;
`


function App(props) {
  // this for the student 

  const { id_user } = props;

  const [darkMode, setDarkMode] = useState(true)
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home isLightMode={darkMode} setIsLightMode={setDarkMode} />} />
                  <Route path="Teachers/:IdT" element={<Teachers />} />
                  <Route path="Profile" element={<Profile isLightMode={darkMode} setIsLightMode={setDarkMode}/>} />

                  <Route path="/Modules/:courseId/:nameM/:firstName/:lastName" element={<Modules isLightMode={darkMode} setIsLightMode={setDarkMode} />} />
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider >
  );
}
export default App;
