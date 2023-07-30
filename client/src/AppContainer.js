import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppUse from './AppUse';
import { setIsAuthenticated } from './redux/userslice';
import { BrowserRouter } from 'react-router-dom';
import AppLogin from './personal-portfolio/src/App';

function AppContainer() {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const id_user = useSelector(state => state.user.id_user);
    const dispatch = useDispatch();
    // this for realated between the page login the anthoer pages 
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

            {isAuthenticated ? <AppUse id_user={id_user} /> :
                <AppLogin />
            }
        </>
    );
}

export default AppContainer;
