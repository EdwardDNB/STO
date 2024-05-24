import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { User } from './state/userSlice';

interface EditUserDialogProps {
    open: boolean;
    onClose: () => void;
    user: User;
    onEdit: (user: User) => void;
}

export const EditUserDialog: React.FC<EditUserDialogProps> = ({ open, onClose, user, onEdit }) => {
    const [editedUser, setEditedUser] = useState<User>(user);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onEdit(editedUser);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>
                <TextField
                    label="First Name"
                    name="firstName"
                    value={editedUser.firstName}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Last Name"
                    name="lastName"
                    value={editedUser.lastName}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Patronymic"
                    name="patronymic"
                    value={editedUser.patronymic}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Phone"
                    name="phone"
                    value={editedUser.phone}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Email"
                    name="mail"
                    value={editedUser.mail}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Roles"
                    name="roles"
                    value={editedUser.roles}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    );
};
