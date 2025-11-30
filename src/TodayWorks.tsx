import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from './state/store';
import { fetchOrders } from "./state/ordersSlice";
import { isToday } from 'date-fns';
import { OrderCard } from "./OrderCard";
import { Todolist } from "./Todolist";
import { initTasks } from "./state/tasksSlice";
import { GenerateInvoiceButton } from "./GenerateInvoiceButton";
import { About } from "./About";

export const TodayWorks: React.FC = () => {
    const dispatch = useAppDispatch();
    const orders = useAppSelector(state => state.orders.orders);
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        // Викликається тільки один раз
        dispatch(fetchOrders());
        dispatch(initTasks());
    }, [dispatch]);

    if (!isAuthenticated) {
        return <About />;
    }

    // Безпечне перетворення рядка у дату (уникає Invalid Date)
    const todayOrders = orders.filter(order => {
        const parsed = new Date(order.desiredDate);
        return !isNaN(parsed.getTime()) && isToday(parsed);
    });

    return (
        <Box
            sx={{
                backgroundImage: `url('http://localhost:3001/images/alireza-esmaeeli-9dua0yk11bg-unsplash.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                p: 4,
            }}
        >
            <Grid container spacing={4} justifyContent="center">
                {todayOrders.map(order => (
                    <Grid item xs={12} sm={6} md={4} key={order.id}>
                        <OrderCard order={order} />
                        <Todolist id={order.id} />
                        <GenerateInvoiceButton orderId={order.id} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
