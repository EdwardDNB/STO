import React, { useState } from 'react';
import {
    Typography,
    IconButton,
    Box,
    Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/system';
import { User } from './state/userSlice';
import { EditUserDialog } from './EditUserDialog';

// === Glass Card ===
const GlassCard = styled("div")(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: 16,
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.25)",
    color: "#fff",
    position: "relative",
    marginBottom: theme.spacing(3),
    transition: "0.3s ease",
    "&:hover": {
        transform: "translateY(-4px)",
        borderColor: "rgba(255,255,255,0.4)",
        boxShadow: "0 6px 20px rgba(0,0,0,0.35)"
    }
}));

// Фото користувача
const AvatarImage = styled("img")(() => ({
    width: "100%",
    height: 180,
    objectFit: "cover",
    borderRadius: 12,
    border: "2px solid rgba(255,255,255,0.4)",
    boxShadow: "0 4px 16px rgba(0,0,0,0.4)"
}));

// Кнопка редагування
const EditButton = styled(IconButton)(() => ({
    position: "absolute",
    top: 10,
    right: 10,
    background: "rgba(0,0,0,0.3)",
    backdropFilter: "blur(4px)",
    borderRadius: "50%",
    "&:hover": {
        background: "rgba(0,0,0,0.5)",
    }
}));

// Badge ролі
const RoleChip = styled(Chip)(({ role }: { role: string }) => ({
    fontWeight: 600,
    color: "#fff",
    marginBottom: 8,
    backgroundColor:
        role === "manager"
            ? "rgba(255, 80, 80, 0.8)"
            : role === "staff"
                ? "rgba(80, 140, 255, 0.8)"
                : "rgba(80, 200, 120, 0.8)"
}));

export const UserCard: React.FC<{ user: User; onEdit: (user: User) => void }> = ({ user, onEdit }) => {
    const [editOpen, setEditOpen] = useState(false);

    const handleEditClick = () => setEditOpen(true);
    const handleEditClose = () => setEditOpen(false);

    return (
        <GlassCard>
            <EditButton onClick={handleEditClick} sx={{ color: "#fff" }}>
                <EditIcon />
            </EditButton>

            <AvatarImage
                src={user.photo || "https://via.placeholder.com/300x200?text=No+Photo"}
                alt={`${user.firstName} ${user.lastName}`}
            />

            <Box mt={2}>
                <RoleChip role={user.role} label={user.role.toUpperCase()} />

                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {user.firstName} {user.lastName}
                </Typography>

                <Typography sx={{ opacity: 0.8, mt: 1 }}>
                    Phone: <b>{user.phone}</b>
                </Typography>

                <Typography sx={{ opacity: 0.8 }}>
                    Email: <b>{user.mail}</b>
                </Typography>
            </Box>

            <EditUserDialog
                open={editOpen}
                onClose={handleEditClose}
                user={user}
                onEdit={onEdit}
            />
        </GlassCard>
    );
};
