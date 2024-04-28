import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {v4 as uuid} from "uuid";
import {AppDispatch} from "./store";
import {instance} from "./todo-lists-reducer";

interface Phone {
    id: string;
    number: string;
    date: number;
    called: boolean; // Добавленное свойство
}

export interface PhoneState {
    phones: Phone[];
}

export const initialState: PhoneState = {
    phones: [
        {id: "1", number: "0996373161", date: Date.now(), called: true},
        {id: "2", number: "0996373161", date: Date.now(), called: false},
        {id: "3", number: "0996373161", date: Date.now(), called: true},
        {id: "4", number: "0996373161", date: Date.now(), called: true},
        {id: "5", number: "0996373161", date: Date.now(), called: true},
        {id: "6", number: "0996373161", date: Date.now(), called: true},


    ],
};


export const phoneSlice = createSlice({
    name: 'phones',
    initialState,
    reducers: {
        setPhones: (state, action: PayloadAction<Phone[]>) => {
            state.phones = action.payload;
        },
        addPhone: (state, action: PayloadAction<Phone>) => {
            state.phones.push(action.payload);
        },
        removePhone: (state, action: PayloadAction<string>) => {
            state.phones = state.phones.filter(phone => phone.id !== action.payload);
        },
        removeAllPhones: (state) => {
            state.phones = [];
        },

        toggleCalled: (state, action: PayloadAction<string>) => {
            const phone = state.phones.find(phone => phone.id === action.payload);
            if (phone) {
                phone.called = !phone.called;
            }
        },
    },
});


export const fetchPhones = () => async (dispatch: AppDispatch) => {
    try {
        const response = await instance.get('/phones/get-all');
        dispatch(setPhones(response.data));
    } catch (error) {
        console.error('Error fetching phones:', error);
    }
};

export const addPhoneHandle = (phoneNumber: string) => async (dispatch: AppDispatch) => {
    try {
        const id = uuid();
        const newPhone = {id, number: phoneNumber, date: Date.now(), called: false};
        await instance.post('/phones/add', newPhone);
        dispatch(addPhone(newPhone));
    } catch (error) {
        console.error('Error adding phone:', error);
    }
};

// Middleware для удаления телефона по его ID
export const deletePhone =(id: string) => async (dispatch: AppDispatch) => {
    try {
       await instance.delete(`/phones/remove-one/${id}`);
        dispatch(removePhone(id));
    } catch (error) {
        console.error(error);
    }
};

// Middleware для удаления всех телефонов
export const deleteAllPhones = () => async (dispatch: AppDispatch) => {
    try {
        await instance.delete('/phones/remove-all');
        dispatch(removeAllPhones())
    } catch (error) {
        console.error(error);
    }
};

// Middleware для переключения статуса "called" телефона по его ID
export const togglePhoneCalled = (id: string) => async (dispatch: AppDispatch) => {
    try {
       await instance.patch(`/phones/toggle-called/${id}`);
        dispatch(toggleCalled(id))
    } catch (error) {
        console.error(error);
    }
};


export const {addPhone, removePhone, removeAllPhones, toggleCalled, setPhones} = phoneSlice.actions;

export default phoneSlice.reducer;
