// src/Orders.tsx
import React from 'react';
import {Grid} from '@mui/material';
import {OrderCard} from './OrderCard';
import {Order} from "./state/ordersSlice";

interface OrdersProps {
    orders: Order[]
}

export const Orders: React.FC<OrdersProps> = ({orders}) => {
    return (
        <Grid container spacing={4} justifyContent="center">
            {orders.map(order => (
                <Grid item xs={12} sm={6} md={4} key={order.id}>
                    <OrderCard order={order}/>
                </Grid>
            ))}
        </Grid>

    );
};
