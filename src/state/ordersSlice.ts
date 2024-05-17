// src/state/ordersSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

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
    orders: [
        {
            id: uuid(),
            carBrand: 'Toyota',
            carModel: 'Camry',
            licensePlate: 'A123BC',
            serviceType: 'Oil Change',
            desiredDate: '2024-05-17',
            desiredTime: '10:00',
            comments: 'Please check the brakes as well.',
            phoneNumber: '123-456-7890',
        },
        {
            id: uuid(),
            carBrand: 'Honda',
            carModel: 'Accord',
            licensePlate: 'B456CD',
            serviceType: 'Tire Rotation',
            desiredDate: '2024-05-18',
            desiredTime: '11:00',
            comments: 'Rotate all four tires.',
            phoneNumber: '098-765-4321',
        },
    ],
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<Order>) => {
            state.orders.push({ ...action.payload, id: uuid() });
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
    }
});

export const { addOrder, deleteOrder, updateOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
