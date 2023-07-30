import React, { useState } from 'react'
import styled from 'styled-components'
import jami3a from '../img/jami3aty copy.png'
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { setIsAuthenticated } from '../redux/userslice';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';

const Container = styled.div`
    flex:1;
    background-color: ${({ theme }) => theme.bg};
    height: 100vh;
    color: ${({ theme }) => theme.text};
    font-size: 14px;
    position: sticky;
    top: 0;
`
const Wrapper = styled.div`
    padding:18px 26px;
`
const Logo = styled.div`
    display:flex;
    align-items: center;
    gap: 5px;
`
const Img = styled.img`
    height: 100px;
`
const Item = styled.div`
    display:flex;
    align-items: center;
    gap: 20px;
    cursor: pointer;
    padding: 17px 0;
`
const Hr = styled.hr`
    margin: 15px 0px;
    border: 0.5px solid ${({ theme }) => theme.soft};
`

const Menu2 = ({ darkMode, setDarkMode }) => {
    const dispatch = useDispatch();
    const [user, setUser] = useState([]);
    const { currentUser, isAuthenticated } = useSelector(state => state.user);
    console.log(currentUser)

    //for logout
    const handleLogout = () => {
        dispatch(setIsAuthenticated(false));
    };
    //for this student


    return (
        <Container>
            <Wrapper>
                <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                    <Logo>
                        <Img src={jami3a} />
                    </Logo>
                </Link>
                <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <HomeIcon />
                        Home
                    </Item>
                </Link>
                <Hr />
                <Link to="/Profile" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <AccountCircleIcon />
                        Profile
                    </Item>
                </Link>
                <Hr />
                <Item onClick={() => setDarkMode(!darkMode)}>
                    <LightModeIcon />
                    LightMode
                </Item>
                <Hr />


                <Item onClick={dispatch(() => handleLogout)}>
                    <LogoutIcon />
                    Logout
                </Item>
            </Wrapper>
        </Container>
    )
}

export default Menu2

