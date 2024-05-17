// src/state/ordersSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import {AppDispatch} from "./store";


export interface Order {
    id: string;
    carBrand: string;
    carModel: string;
    licensePlate: string;
    serviceType: string;
    desiredDate: string;
    desiredTime: string;
    comments: string;
    phoneNumber: string;
}

interface OrdersState {
    orders: Order[];
}

const initialState: OrdersState = {
    orders: [],
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setOrders: (state, action: PayloadAction<Order[]>) => {
            state.orders = action.payload;
        },
        addOrder: (state, action: PayloadAction<Order>) => {
            state.orders.push(action.payload);
        },
        deleteOrder: (state, action: PayloadAction<string>) => {
            state.orders = state.orders.filter(order => order.id !== action.payload);
        },
        updateOrder: (state, action: PayloadAction<Order>) => {
            const index = state.orders.findIndex(order => order.id === action.payload.id);
            if (index !== -1) {
                state.orders[index] = action.payload;
            }
        },
    },
});

export const { setOrders, addOrder, deleteOrder, updateOrder } = ordersSlice.actions;

export const fetchOrders= () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get('/orders');
        dispatch(setOrders(response.data));
    } catch (error) {
        console.error('Failed to fetch orders:', error);
    }
};

export const createOrder = (order: Order) => async (dispatch: AppDispatch) =>  {
    const id = uuid();
    const orderWithId={...order,id}
    try {
        const response = await axios.post('/orders', orderWithId);
        dispatch(addOrder(response.data));
    } catch (error) {
        console.error('Failed to create order:', error);
    }
};

export const removeOrder = (id: string) => async (dispatch: AppDispatch)  => {
    try {
        await axios.delete(`/orders/${id}`);
        dispatch(deleteOrder(id));
    } catch (error) {
        console.error('Failed to delete order:', error);
    }
};

export const modifyOrder = (order: Order) => async (dispatch: AppDispatch) =>  {
    try {
        const response = await axios.put(`/orders/${order.id}`, order);
        dispatch(updateOrder(response.data));
    } catch (error) {
        console.error('Failed to update order:', error);
    }
};

export default ordersSlice.reducer;
