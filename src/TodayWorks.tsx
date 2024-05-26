import React, {useEffect} from 'react';
import {Box, Grid} from '@mui/material';
import {useAppDispatch, useAppSelector} from './state/store';
import {fetchOrders} from "./state/ordersSlice";
import {isToday} from 'date-fns';
import {OrderCard} from "./OrderCard";
import {Todolist} from "./Todolist";
import {initTasks} from "./state/tasksSlice";
import {GenerateInvoiceButton} from "./GenerateInvoiceButton";


export const TodayWorks: React.FC = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchOrders());
        dispatch(initTasks());
    }, [dispatch]);

    const orders = useAppSelector(state => state.orders.orders);

    // Filter orders with today's date
    const todayOrders = orders.filter(order => isToday(new Date(order.desiredDate)));

    return (
        <Box
            sx={{
                backgroundImage: `url('http://localhost:3001/images/male-female-mechanics-working-shop-car-notes.jpg')`,
                backgroundSize: 'cover',
                minHeight: '100vh',
                p: 4
            }}
        >
            <Box mb={2} sx={{marginBottom: '20px'}}>
                <Grid container spacing={4} justifyContent="center">
                    {todayOrders.map(order => (
                        <Grid item xs={12} sm={6} md={4} key={order.id}>
                            <OrderCard order={order}/>
                            <Todolist id={order.id}/>
                            <GenerateInvoiceButton orderId={order.id} />
                        </Grid>
                    ))}
                </Grid>
            </Box>

        </Box>
    );
};





