// src/OrderCard.tsx
import React, {useState} from 'react';
import {Card, CardContent, Typography, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useDispatch} from 'react-redux';
import {deleteOrder, Order, updateOrder} from './state/ordersSlice';
import {OrderFormDialog} from "./OrderFormDialog";

interface OrderCardProps {
    order: Order;
}

export const OrderCard: React.FC<OrderCardProps> = ({order}) => {
    const dispatch = useDispatch();
    const [editOpen, setEditOpen] = useState(false);

    const handleDelete = () => {
        dispatch(deleteOrder(order.id));
    };

    const handleEditSubmit = (updatedOrder: Order) => {
        dispatch(updateOrder(updatedOrder));
        setEditOpen(false);
    };

    return (
        <Card style={{position: 'relative'}}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {order.carBrand} {order.carModel}
                </Typography>
                <Typography color="text.secondary">
                    License Plate: {order.licensePlate}
                </Typography>
                <Typography color="text.secondary">
                    Service Type: {order.serviceType}
                </Typography>
                <Typography color="text.secondary">
                    Desired Date: {order.desiredDate}
                </Typography>
                <Typography color="text.secondary">
                    Desired Time: {order.desiredTime}
                </Typography>
                <Typography color="text.secondary">
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
