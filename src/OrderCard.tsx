// src/OrderCard.tsx
import React, { useState } from "react";
import {
    Typography,
    IconButton,
    CardContent,
    Box
} from "@mui/material";
import { styled } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { modifyOrder, Order, removeOrder } from "./state/ordersSlice";
import { OrderFormDialog } from "./OrderFormDialog";
import { useAppDispatch, useAppSelector } from "./state/store";

const GlassCard = styled("div")(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: 16,
    background: "rgba(255, 255, 255, 0.12)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.25)",
    color: "#fff",
    position: "relative",
    marginBottom: theme.spacing(3),
    transition: "0.3s ease",
    overflow: "hidden",

    "&:hover": {
        transform: "translateY(-4px)",
        borderColor: "rgba(255,255,255,0.45)",
    }
}));

const TopActions = styled(Box)(() => ({
    position: "absolute",
    top: 10,
    right: 10,
    display: "flex",
    gap: 8,
    pointerEvents: "auto",
    zIndex: 5
}));

export const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
    const dispatch = useAppDispatch();
    const userRole = useAppSelector((state) => state.auth.user?.role);
    const [editOpen, setEditOpen] = useState(false);

    const handleDelete = () => {
        dispatch(removeOrder(order.id));
    };

    const handleEditSubmit = (updatedOrder: Order) => {
        dispatch(modifyOrder(updatedOrder));
        setEditOpen(false);
    };

    return (
        <GlassCard>
            {(userRole === "manager" || userRole === "staff") && (
                <TopActions>
                    <IconButton
                        sx={{ color: "#ff5555" }}
                        onClick={handleDelete}
                    >
                        <DeleteIcon />
                    </IconButton>

                    <IconButton
                        sx={{ color: "#fff" }}
                        onClick={() => setEditOpen(true)}
                    >
                        <EditIcon />
                    </IconButton>
                </TopActions>
            )}

            <CardContent sx={{ paddingTop: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {order.carBrand} {order.carModel}
                </Typography>

                <Typography sx={{ opacity: 0.85 }}>
                    License Plate: <b>{order.licensePlate}</b>
                </Typography>

                <Typography sx={{ opacity: 0.85 }}>
                    Service Type: <b>{order.serviceType}</b>
                </Typography>

                <Typography sx={{ opacity: 0.85 }}>
                    Desired Date: <b>{order.desiredDate}</b>
                </Typography>

                <Typography sx={{ opacity: 0.85 }}>
                    Desired Time: <b>{order.desiredTime}</b>
                </Typography>

                <Typography sx={{ opacity: 0.85, wordBreak: "break-word" }}>
                    Comments: {order.comments || "No comments"}
                </Typography>

                <Typography sx={{ opacity: 0.85 }}>
                    Phone: <b>{order.phoneNumber}</b>
                </Typography>
            </CardContent>

            {editOpen && (
                <OrderFormDialog
                    open={editOpen}
                    onClose={() => setEditOpen(false)}
                    onSubmit={handleEditSubmit}
                    initialOrder={order}
                    title="Correct order"
                />
            )}
        </GlassCard>
    );
};
