import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from './store';
import {instance} from "./todo-lists-reducer";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    patronymic: string;
    phone: string;
    mail: string;
    photo: string;
    role: 'manager' | 'customer' | 'staff';
    password: string;
    registrationDate: number;
}

interface UsersState {
    users: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UsersState = {
    users: [],
    loading: false,
    error: null,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<User[]>) {
            state.users = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
        updateUser(state, action: PayloadAction<User>) {
            const index = state.users.findIndex(user => user.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        },
    },
});

export const { setUsers, setLoading, setError, updateUser } = usersSlice.actions;

export default usersSlice.reducer;

// Асинхронная функция для получения всех пользователей
export const fetchUsers = () => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await instance.get('/users');
        dispatch(setUsers(response.data));
        dispatch(setError(null));
    } catch (error) {
        dispatch(setError('Failed to fetch users'));
    } finally {
        dispatch(setLoading(false));
    }
};

// Асинхронная функция для редактирования пользователя
export const editUser = (user: User) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await instance.put(`/users/${user.id}`, user);
        dispatch(updateUser(response.data));
        dispatch(setError(null));
    } catch (error) {
        dispatch(setError('Failed to edit user'));
    } finally {
        dispatch(setLoading(false));
    }
};
