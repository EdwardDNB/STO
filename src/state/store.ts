
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import newsReducer  from "./newsSlice";
import phoneReducer  from "./phoneSlice";
import authReducer  from "./authSlice";
import ordersReducer  from "./ordersSlice";
import tasksReducer  from "./tasksSlice";
import usersReducer  from "./userSlice";
import invoicesReducer  from "./invoicesSlice";
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';





const rootReducers=combineReducers({
    tasks:tasksReducer,
    news: newsReducer,
    phones:phoneReducer,
    auth:authReducer,
    orders: ordersReducer,
    users: usersReducer,
    invoices: invoicesReducer,

})
export const store=configureStore({
    reducer: rootReducers
})

export type AppRootState = ReturnType<typeof rootReducers>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;
export const selectInvoices = (state: AppRootState) => state.invoices.invoices;
export const selectLoading = (state: AppRootState) => state.invoices.loading;
export const selectError = (state: AppRootState) => state.invoices.error;
