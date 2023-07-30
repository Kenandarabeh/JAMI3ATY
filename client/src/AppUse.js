import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import App from './App';
import { setIsAuthenticated } from './redux/userslice';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import AppT from './AppT';
import AppA from './AppA';

function AppUse() {
    const { currentUser, isAuthenticated } = useSelector(state => state.user);
    const [useres, setuseres] = useState([]);
// this for to take admin go to page admin take login go to the page admin take the student go to the page student 
    useEffect(() => {
        const fetchCourses = async () => {
            const res = await axios.get(`http://localhost:8800/api/users/find/${currentUser}`);
            console.log(res.data);
            setuseres(res.data);
        };

        fetchCourses();
    }, [currentUser]);

    const id_user = useSelector(state => state.user.id_user);
    const dispatch = useDispatch();

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            dispatch(setIsAuthenticated(true));
        }
    }, [dispatch]);

    useEffect(() => {
        if (isAuthenticated) {
            localStorage.setItem('token', 'access_token');
        } else {
            localStorage.removeItem('token');
        }
    }, [isAuthenticated]);

    return (
        <>
            {useres && useres.role === 'teacher' ? (
                <AppT id_user={id_user} />
            ) : (useres.role==='admin'?
                <AppA/>
            :<App/>)}
        </>
    );
}

export default AppUse;
