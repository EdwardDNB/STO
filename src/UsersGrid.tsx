import React, { useEffect } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from './state/store';
import { fetchUsers, editUser, User, setUsersClear } from './state/userSlice';
import { UserCard } from './UserCard';
import { About } from "./About";

export const UsersGrid = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector(state => state.users.users);
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchUsers());
        } else {
            dispatch(setUsersClear());
        }
    }, [dispatch, isAuthenticated]);

    if (!isAuthenticated) {
        return <About />;
    }

    const handleEditUser = (user: User) => {
        dispatch(editUser(user));
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                p: 4,
                backgroundImage: `url("https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=2070")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
            }}
        >
            {/* Напівпрозорий затемнюючий шар */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0.55)",
                    backdropFilter: "blur(3px)",
                    zIndex: 1,
                }}
            />

            <Box sx={{ position: "relative", zIndex: 2 }}>


                <Grid
                    container
                    spacing={4}
                    justifyContent="center"
                >
                    {users.map((user) => (
                        <Grid item xs={12} sm={6} md={4} key={user.id}>
                            <UserCard user={user} onEdit={handleEditUser} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};
