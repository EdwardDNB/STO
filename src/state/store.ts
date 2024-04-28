import {todoListsReducer} from "./todo-lists-reducer";
import {tasksReducer} from "./tasks-reducer";
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import newsReducer  from "./newsSlice";
import phoneReducer  from "./phoneSlice";
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';




const rootReducers=combineReducers({
    todoLists:todoListsReducer,
    tasks:tasksReducer,
    news: newsReducer,
    phones:phoneReducer
})
export const store=configureStore({
    reducer: rootReducers
})

export type AppRootState = ReturnType<typeof rootReducers>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;
