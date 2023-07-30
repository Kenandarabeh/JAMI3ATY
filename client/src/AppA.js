import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/MenuAdmin";
import Navbar from "./components/NavbarAdmin";
import { darkTheme, lightTheme, AdminThem } from "./utils/Theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Teachers from "./pages/Teachers2";
import Modules from "./pages/Modules";
import CreateModules from "./pages/CreateModules2";
import Profile from "./pages/profileAdmin";
import CreateUser from "./pages/CreateStudent";
import { useState } from "react";
import CreateChapter from "./pages/CreateChapter2";
import CreateTeacher from "./pages/CreateTeacher";

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

function AppA(props) {
    const { id_user } = props;
    const [darkMode, setDarkMode] = useState(false);
    // this for the Admin
    return (
        <ThemeProvider theme={AdminThem}>
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
                                    <Route path="/createStudent" element={<CreateUser isLightMode={darkMode} setIsLightMode={setDarkMode} />} />
                                    <Route path="/createTeacher" element={<CreateTeacher isLightMode={darkMode} setIsLightMode={setDarkMode} />} />
                                    <Route path="/createModules/:userId/:nameT" element={<CreateModules isLightMode={darkMode} setIsLightMode={setDarkMode} />} />
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

export default AppA;