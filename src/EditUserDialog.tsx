import React, { useState, ChangeEvent } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    SelectChangeEvent
} from '@mui/material';
import { User } from './state/userSlice';
import { PhotoCamera } from '@mui/icons-material';

interface EditUserDialogProps {
    open: boolean;
    onClose: () => void;
    user: User;
    onEdit: (user: User) => void;
}

export const EditUserDialog: React.FC<EditUserDialogProps> = ({ open, onClose, user, onEdit }) => {
    const [editedUser, setEditedUser] = useState<User>(user);


    const handleChange = (e: ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        setEditedUser(prev => ({ ...prev, [name as string]: value }));
    };

    const handleRoleChange = (event: SelectChangeEvent<'manager' | 'customer' | 'staff'>) => {
        setEditedUser(prev => ({ ...prev, role: event.target.value as 'manager' | 'customer' | 'staff' }));
    };



    const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditedUser(prev => ({ ...prev, photo: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        onEdit(editedUser );
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
                {user.role==='manager'&&<FormControl fullWidth margin="dense" >
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                        label={'Role'}
                        labelId="role-label"
                        value={editedUser.role}
                        onChange={handleRoleChange}
                    >
                        <MenuItem value="manager">Manager</MenuItem>
                        <MenuItem value="customer">Customer</MenuItem>
                        <MenuItem value="staff">Staff</MenuItem>
                    </Select>
                </FormControl>}

                <Button
                    variant="contained"
                    component="label"
                    fullWidth
                    sx={{ marginTop: 2 }}
                    startIcon={<PhotoCamera />}
                >
                    Upload Photo
                    <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handlePhotoChange}
                    />
                </Button>
                {editedUser.photo && (
                    <img
                        src={editedUser.photo}
                        alt="User"
                        style={{ marginTop: 20, width: '100%', maxHeight: 300 }}
                    />
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    );
};
