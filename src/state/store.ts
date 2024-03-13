import {combineReducers, legacy_createStore as createStore} from "redux";
import {todoListsReducer} from "./todo-lists-reducer";
import {tasksReducer} from "./tasks-reducer";
const rootReducers=combineReducers({
    todoLists:todoListsReducer,
    tasks:tasksReducer
})
export const store=createStore(rootReducers)

export type AppRootState=ReturnType<typeof rootReducers>