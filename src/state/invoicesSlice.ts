// src/state/invoicesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {AppDispatch} from "./store";
import {instance} from "./todo-lists-reducer";


export interface Task {
    id: string;
    title: string;
    supplies: string;
    suppliesCost: number;
}

export interface Invoice {
    id: string;
    orderId: string;
    firstName:string;
    lastName:string;
    carBrand: string;
    carModel: string;
    licensePlate: string;
    serviceType: string;
    desiredDate: string;
    desiredTime: string;
    comments?: string;
    phoneNumber: string;
    tasks: Task[];
    workCost: number;
    totalCost: number;
    paymentDone: boolean;
    createdAt?: string;
    updatedAt?: string;
}

interface InvoicesState {
    invoices: Invoice[];
    loading: boolean;
    error: string | null;
}

const initialState: InvoicesState = {
    invoices: [],
    loading: false,
    error: null,
};

const invoicesSlice = createSlice({
    name: 'invoices',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setInvoices: (state, action: PayloadAction<Invoice[]>) => {
            state.invoices = action.payload;
        },
        addInvoice: (state, action: PayloadAction<Invoice>) => {
            state.invoices.push(action.payload);
        },
        updateInvoice: (state, action: PayloadAction<Invoice>) => {
            const index = state.invoices.findIndex(invoice => invoice.id === action.payload.id);
            if (index !== -1) {
                state.invoices[index] = action.payload;
            }
        },
        deleteInvoice: (state, action: PayloadAction<string>) => {
            state.invoices = state.invoices.filter(invoice => invoice.id !== action.payload);
        },
        setPaymentDone: (state, action: PayloadAction<{ id: string; paymentDone: boolean }>) => {
            const invoice = state.invoices.find(invoice => invoice.id === action.payload.id);
            if (invoice) {
                invoice.paymentDone = action.payload.paymentDone;
            }
        },
    },
});

export const {
    setLoading,
    setError,
    setInvoices,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    setPaymentDone,
} = invoicesSlice.actions;

export default invoicesSlice.reducer;

// Async functions
export const fetchInvoices = () => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await instance.get('/invoices');
        dispatch(setInvoices(response.data));
    } catch (error) {
        dispatch(setError(error as string));
    } finally {
        dispatch(setLoading(false));
    }
};

export const addInvoiceAsync = (orderId:string)=> async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await instance.post('/invoices', {orderId});
        dispatch(addInvoice(response.data));
    } catch (error) {
        dispatch(setError('Error create invoice'));
    } finally {
        dispatch(setLoading(false));
    }
};

export const deleteInvoiceAsync = (id: string)=> async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        await instance.delete(`/invoices/${id}`);
        dispatch(deleteInvoice(id));
    } catch (error) {
        dispatch(setError(error as string));
    } finally {
        dispatch(setLoading(false));
    }
};

export const updateInvoiceAsync = (invoice: Invoice)=> async (dispatch: AppDispatch) =>  {
    dispatch(setLoading(true));
    try {
        const response = await instance.put(`/invoices/${invoice.id}`, invoice);
        dispatch(updateInvoice(response.data));
    } catch (error) {
        dispatch(setError(error as string));
    } finally {
        dispatch(setLoading(false));
    }
};

export const setPaymentDoneAsync = (id: string, paymentDone: boolean)=> async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await instance.patch(`/invoices/${id}/pay`, { paymentDone });
        dispatch(setPaymentDone({ id, paymentDone: response.data.paymentDone }));
    } catch (error) {
        dispatch(setError(error as string));
    } finally {
        dispatch(setLoading(false));
    }
};
