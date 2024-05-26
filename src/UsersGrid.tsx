import React, {useEffect} from 'react';
import {Grid, Box} from '@mui/material';
import {useAppDispatch, useAppSelector} from './state/store';
import {fetchUsers, editUser, User, setUsersClear} from './state/userSlice';
import {UserCard} from './UserCard';
import {About} from "./About";



export const UsersGrid = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector(state => state.users.users);
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchUsers());
        }
        if (!isAuthenticated) {
            dispatch(setUsersClear());
        }

    }, [dispatch, isAuthenticated]);
    if (!isAuthenticated) {
        return <About/>;
    }

    const handleEditUser = (user: User) => {
        dispatch(editUser(user));
    };

    return (
        <Box
            sx={{
                backgroundImage: `url('https://source.unsplash.com/featured/1600x900/?background')`,
                backgroundSize: 'cover',
                minHeight: '100vh',
                p: 4,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <Grid container spacing={4}>
                {users.map((user) => (
                    <Grid item xs={12} sm={6} md={4} key={user.id}>
                        <UserCard user={user} onEdit={handleEditUser}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
