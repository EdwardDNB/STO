import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {v4 as uuid} from "uuid";
import {AppDispatch} from "./store";
import {instance} from "./todo-lists-reducer";


interface User {
    id: string;
    firstName: string;
    lastName: string;
    patronymic: string;
    phone: string;
    mail: string;
    photo: string;
    roles: "manager"|"customer"|"staff";
    password: string
    registrationDate: number

}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    error: any | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
        },
        register: (state, action: PayloadAction<User>) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

export const {login, logout, register, setError} = authSlice.actions;

export const registerUserHandle = (name: string, password: string, phone: string, mail: string) => async (dispatch: AppDispatch) => {
    try {
        const id = uuid();
        const newUser: User = {
            id,
            firstName: name,
            lastName: '',
            patronymic: '',
            photo: '',
            roles: 'customer',
            password,
            phone,
            mail,
            registrationDate: Date.now(),
        }
        const response=await instance.post('/register',newUser)
        console.log(response)
        dispatch(register(newUser))

    } catch (error: any) {
        dispatch(setError(error.data.message))
        console.error('Error register user:', error.data.message);
    }
};
// Предполагается, что token приходит в ответе после аутентификации
export const handleLogin = (mail:string,phone:string, password:string) =>async(dispatch: AppDispatch) =>{
    try {
        const response = await instance.post('/login', { mail,phone, password });
        const token = response.data.token;
        // Сохранение токена в localStorage
        localStorage.setItem('token', token);
        // Перенаправление на другую страницу или выполнение других действий
        dispatch(login(response.data.user))
        console.log(response.data)
        console.log(token)
        console.log(localStorage)
    } catch (error:any) {
        dispatch(setError(error.data.message))
        console.error('Ошибка входа:', error.data.message);
    }
};
export const handleLogout = () =>async(dispatch: AppDispatch) =>{
    try {
        await instance.post('/logout');
        localStorage.setItem('token', "");
        dispatch(logout())
    } catch (error:any) {
        dispatch(setError(error.data.message))
        console.error('Ошибка входа:', error.data.message);
    }
};


export default authSlice.reducer;
