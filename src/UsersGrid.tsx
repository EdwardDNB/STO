import React, { useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from './state/store';
import {fetchUsers, editUser, User} from './state/userSlice';
import { UserCard } from './UserCard';

export const UsersGrid: React.FC = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector(state => state.users.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

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
                        <UserCard user={user} onEdit={handleEditUser} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
