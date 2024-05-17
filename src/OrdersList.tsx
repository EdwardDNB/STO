// src/OrdersList.tsx
import React from 'react';
import { Grid, Box } from '@mui/material';
import {useAppSelector} from './state/store';
import {OrderFormAdd} from './OrderFormAdd';
import { OrderCard } from './OrderCard';


export const OrdersList: React.FC = () => {
    const orders = useAppSelector(state => state.orders.orders);


    return (
        <Box
            sx={{
                backgroundImage: `url('https://source.unsplash.com/featured/1600x900/?cars')`,
                backgroundSize: 'cover',
                minHeight: '100vh',
                p: 4
            }}
        >
            <Box mb={2} style={{ marginBottom: '20px' }}>
            <OrderFormAdd title={'Leave a request for service'}  />
            </Box>
            <Grid container spacing={4} justifyContent="center">
                {orders.map(order => (
                    <Grid item xs={12} sm={6} md={4} key={order.id}>
                        <OrderCard order={order} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
