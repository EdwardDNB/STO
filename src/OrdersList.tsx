// src/OrdersList.tsx
import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from './state/store';
import { OrderFormAdd } from './OrderFormAdd';
import { fetchOrders, setOrdersClear } from "./state/ordersSlice";
import { OrderCard } from "./OrderCard";
import { About } from "./About";
import { styled } from "@mui/system";

const PageWrapper = styled('div')({
    minHeight: '100vh',
    backgroundImage: 'url("https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=2000")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    position: 'relative',

    '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(3px)',
        zIndex: 1,
    }
});

const Content = styled('div')({
    position: 'relative',
    zIndex: 2
});

const GlassCardWrapper = styled('div')({
    background: 'rgba(255, 255, 255, 0.10)',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    borderRadius: 16,
    padding: '20px',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
    maxWidth: 800,
    width: '100%',
    margin: '0 auto 30px',
});

export const OrdersList: React.FC = () => {
    const dispatch = useAppDispatch()
    const orders = useAppSelector(state => state.orders.orders);
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchOrders());
        } else {
            dispatch(setOrdersClear());
        }
    }, [dispatch, isAuthenticated]);

    if (!isAuthenticated) {
        return <About />;
    }

    return (
        <PageWrapper>
            <Content>
                <GlassCardWrapper>
                    <OrderFormAdd title={'Leave a request for service'} />
                </GlassCardWrapper>

                <Grid container spacing={4} justifyContent="center">
                    {orders.map(order => (
                        <Grid item xs={12} sm={6} md={4} key={order.id}>
                            <OrderCard order={order} />
                        </Grid>
                    ))}
                </Grid>
            </Content>
        </PageWrapper>
    );
};
