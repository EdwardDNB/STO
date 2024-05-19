import axios from 'axios';

// Получение токена из localStorage
const token = localStorage.getItem('token');
export const instance = axios.create({
    baseURL: 'http://localhost:3001',
    withCredentials: true,
    headers: {
        'Authorization': `Bearer ${token}`
    }
});
