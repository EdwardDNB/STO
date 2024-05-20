import React, {useEffect} from 'react';
import {Button} from '@mui/material';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "./state/store";
import {checkTokenValidity, handleLogoutSank} from "./state/authSlice";

export const AuthButton: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Проверяем наличие токена в localStorage
        const token = localStorage.getItem('token');
        if (token) {
            // Выполняем запрос на сервер для проверки токена
            dispatch(checkTokenValidity());
        }
    }, [dispatch]);
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

    const handleLogout = () => {
        dispatch(handleLogoutSank());
    };
    return (
        <>
            {isAuthenticated ? (
                <Button onClick={handleLogout} style={{textDecoration: 'none', color: 'inherit'}}>
                    Logout</Button>
            ) : (
                <Link to="/login" style={{textDecoration: 'none', color: 'inherit'}}>
                    <Button color="inherit">Login/Register</Button>
                </Link>
            )}
        </>
    );
};


