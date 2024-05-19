// src/OrderCard.tsx
import React, {useState} from 'react';
import {Card, CardContent, Typography, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {modifyOrder, Order, removeOrder} from './state/ordersSlice';
import {OrderFormDialog} from "./OrderFormDialog";
import {useAppDispatch} from "./state/store";

interface OrderCardProps {
    order: Order;
}

export const OrderCard: React.FC<OrderCardProps> = ({order}) => {
    const dispatch = useAppDispatch();
    const [editOpen, setEditOpen] = useState(false);

    const handleDelete = () => {
        dispatch(removeOrder(order.id));
    };

    const handleEditSubmit = (updatedOrder: Order) => {
        dispatch(modifyOrder(updatedOrder));
        setEditOpen(false);
    };

    return (
        <Card sx={{position: 'relative'}} >
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="div" sx={{ wordBreak: 'break-word' }}>
                    {order.carBrand} {order.carModel}
                </Typography>
                <Typography color="text.secondary" sx={{ wordBreak: 'break-word' }}>
                    License Plate: {order.licensePlate}
                </Typography>
                <Typography color="text.secondary" sx={{ wordBreak: 'break-word' }}>
                    Service Type: {order.serviceType}
                </Typography>
                <Typography color="text.secondary">
                    Desired Date: {order.desiredDate}
                </Typography>
                <Typography color="text.secondary">
                    Desired Time: {order.desiredTime}
                </Typography>
                <Typography color="text.secondary"  sx={{ wordBreak: 'break-word' }}>
                    Comments: {order.comments}
                </Typography>
                <Typography color="text.secondary">
                    Phone Number: {order.phoneNumber}
                </Typography>
                <IconButton
                    onClick={handleDelete}
                    sx={{float: 'right', color: 'rgba(0, 0, 0, 0.54)'}}
                >
                    <DeleteIcon/>
                </IconButton>
                <IconButton
                    onClick={() => setEditOpen(true)}
                    sx={{color: 'rgba(0, 0, 0, 0.54)'}}
                >
                    <EditIcon/>
                </IconButton>
            </CardContent>

            {editOpen && (
                <OrderFormDialog open={editOpen} onClose={()=>{setEditOpen(false)}}
                    onSubmit={handleEditSubmit}
                    initialOrder={order}
                    title={'Correct order'}
                />
            )}
        </Card>
    );
};
