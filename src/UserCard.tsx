import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { User } from './state/userSlice';
import { EditUserDialog } from './EditUserDialog';

interface UserCardProps {
    user: User;
    onEdit: (user: User) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onEdit }) => {
    const [editOpen, setEditOpen] = useState(false);

    const handleEditClick = () => {
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
    };

    return (
        <Card>
            <CardMedia
                component="img"
                height="140"
                image={user.photo || 'https://via.placeholder.com/150'}
                alt={`${user.firstName} ${user.lastName}`}
            />
            <CardContent>
                <Typography variant="h5">
                    {user.firstName} {user.lastName}
                </Typography>
                <Typography color="textSecondary">
                    {user.roles}
                </Typography>
                <Typography color="textSecondary">
                    {user.phone}
                </Typography>
                <Typography color="textSecondary">
                    {user.mail}
                </Typography>
                <Box display="flex" justifyContent="flex-end">
                    <IconButton onClick={handleEditClick}>
                        <EditIcon />
                    </IconButton>
                </Box>
            </CardContent>
            <EditUserDialog
                open={editOpen}
                onClose={handleEditClose}
                user={user}
                onEdit={onEdit}
            />
        </Card>
    );
};
