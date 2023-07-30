import React, { useState } from 'react';
import styled from 'styled-components';
import jami3a from '../img/jami3aty.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { setIsAuthenticated } from '../redux/userslice';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';

const Container = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.bg};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;
`;

const Wrapper = styled.div`
  padding: 18px 26px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Img = styled.img`
  height: 100px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 17px 0;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const MenuAdmin = ({ darkMode, setDarkMode }) => {
    const dispatch = useDispatch();
    const { currentUser, isAuthenticated } = useSelector(state => state.user);
    const [isLightMode, setIsLightMode] = useState(!darkMode);

    // for logout
    const handleLogout = () => {
        dispatch(setIsAuthenticated(false));
    };
    //this for the admin

    return (
        <Container>
            <Wrapper>
                <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                    <Logo>
                        <Img src={jami3a} />
                    </Logo>
                </Link>
                <Hr />
                <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                    <Item>
                        <AccountCircleIcon />
                        Profile
                    </Item>
                </Link>
                <Hr />

                <Link to="/createStudent" style={{ textDecoration: 'none', color: 'white' }}>
                    <Item>
                        <FolderCopyIcon />
                        Student Management
                    </Item>
                </Link>
                <Hr />
                <Link to="/createTeacher" style={{ textDecoration: 'none', color: 'white' }}>
                    <Item>
                        <FolderCopyIcon />
                        Teacher Management
                    </Item>
                </Link>
                <Hr />
                <Item onClick={handleLogout} style={{ textDecoration: 'none', color: 'white' }}>
                    <LogoutIcon />
                    Logout
                </Item>
            </Wrapper>
        </Container>
    );
};

export default MenuAdmin;
