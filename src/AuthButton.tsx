import React, {useEffect} from 'react';
import { Button, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "./state/store";
import {checkTokenValidity} from "./state/authSlice";

export const AuthButton: React.FC = () => {

    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    const user = useAppSelector(state => state.auth.user);
    console.log(user)
    return (
        <>
            {isAuthenticated ? (
                <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Button startIcon={<Avatar alt="User Photo" src={user?.photo} sx={{ width: 40, height: 40 }} />}>
                        {user?.firstName}
                    </Button>
                </Link>
            ) : (
                <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Button color="inherit">Login</Button>
                </Link>
            )}
        </>
    );
};


