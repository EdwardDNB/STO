import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {v4 as uuid} from "uuid";
import {AppDispatch} from "./store";

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
          { id: "1", number: "0996373161",date:Date.now(),called:true },
          { id: "2", number: "0996373161",date:Date.now(),called:false  },
          { id: "3", number: "0996373161",date:Date.now(),called:true  },
          { id: "4", number: "0996373161",date:Date.now(),called:true  },
          { id: "5", number: "0996373161",date:Date.now(),called:true  },
          { id: "6", number: "0996373161",date:Date.now(),called:true  },


    ],
};


export const phoneSlice = createSlice({
    name: 'phones',
    initialState,
    reducers: {
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

export const addPhoneHandle = (phoneNumber:string) => async (dispatch: AppDispatch) => {
    const id = uuid();
    const newPhone={ id, number:phoneNumber,date:Date.now(),called:false }
    dispatch(addPhone(newPhone))
}





export const { addPhone, removePhone,removeAllPhones,toggleCalled } = phoneSlice.actions;

export default phoneSlice.reducer;
