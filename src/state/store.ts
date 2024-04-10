import {todoListsReducer} from "./todo-lists-reducer";
import {tasksReducer} from "./tasks-reducer";
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {useDispatch} from "react-redux";

const rootReducers=combineReducers({
    todoLists:todoListsReducer,
    tasks:tasksReducer
})
export const store=configureStore({
    reducer: rootReducers
})

export type AppRootState=ReturnType<typeof rootReducers>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()