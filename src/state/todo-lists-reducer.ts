import {ToDoListsTypes} from "./todolists-reducer.test";
import {v4 as uuid} from "uuid";
import axios from 'axios';
import { Dispatch } from 'redux';





export type InitToDoListsActionType = {
    type: 'INIT-TODOLIST',
    todoLists: Array<ToDoListsTypes>
}
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todoListId: string
}
type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TITLE-TODOLIST',
    title: string,
    id: string
}

export type ActionsType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType | InitToDoListsActionType
export const todolist1 = uuid()
export const todolist2 = uuid()

const initialState: Array<ToDoListsTypes> = [
    {id: todolist1, title: 'Porsche Panamera'},
    {id: todolist2, title: 'Ford Mustang GT'}
]
export const todoListsReducer = (state: Array<ToDoListsTypes> = initialState, action: ActionsType): ToDoListsTypes[] => {
    switch (action.type) {
        case 'INIT-TODOLIST':
            return [...action.todoLists];
        case 'REMOVE-TODOLIST':
            return [...state.filter(tl => tl.id !== action.id)]
        case 'ADD-TODOLIST':
            return [...state, {
                id: action.todoListId,
                title: action.title,

            }]
        case 'CHANGE-TITLE-TODOLIST':
            return [...state.map(tl => tl.id === action.id
                ? {...tl,title:action.title}
                : tl)]
        default:
            return [...state]
    }
}
export const removeTodolistAC = (todoListId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todoListId} //fabric func
}
export const addTodolistAC = (todoTitle: string,todoListId:string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: todoTitle, todoListId}
}
export const changeTodolistTitleAC = (todoTitle: string, id: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TITLE-TODOLIST', title: todoTitle, id}
}
export const instance = axios.create({
      baseURL: 'http://localhost:3001',
    withCredentials: true,

});

export const initTodoLists = () => async (dispatch: Dispatch) => {
    try {
        const response = await instance.get('/todolists');
             dispatch({ type: 'INIT-TODOLIST', todoLists: response.data });
    } catch (error) {
        console.error('Failed to fetch todo lists:', error);
    }
};
export const addTodolistSank = (todoTitle: string) => async (dispatch: Dispatch) => {
    try {
        // Отправляем POST запрос на сервер для создания нового тудулиста
        const response = await instance.post('/todolists', { id:uuid(),title: todoTitle });
          // Если запрос выполнен успешно, диспетчеризуем экшен для добавления тудулиста в состояние
        dispatch(addTodolistAC(response.data.title,response.data.id))

    } catch (error) {
        // Если произошла ошибка при выполнении запроса, обрабатываем её здесь
        console.error('Failed to add todolist:', error);
        // Можно выполнить какие-то дополнительные действия, например, показать сообщение об ошибке
    }
};
export const removeTodolistSank = (todoListId: string) => async (dispatch: Dispatch) => {
    try {
        // Отправляем DELETE запрос на сервер для удаления Todolist
        await instance.delete(`/todolists/${todoListId}`);
        await instance.delete(`/tasksclear/${todoListId}`);
        // Если запрос выполнен успешно, диспетчеризуем экшен для удаления задачи из состояния
        dispatch(removeTodolistAC(todoListId));
    } catch (error) {
        // Если произошла ошибка при выполнении запроса, обрабатываем её здесь
        console.error('Failed to remove Todolist:', error);
        // Можно выполнить какие-то дополнительные действия, например, показать сообщение об ошибке
    }
};
export const updateTodolistTitleSank = (todoTitle: string, id: string) => async (dispatch: Dispatch) => {
    try {
        // Выполняем PUT запрос на сервер для обновления заголовка
      await instance.put(`/todolists/updateTitle/${id}`, {title: todoTitle});
        dispatch(changeTodolistTitleAC(todoTitle,id))

    } catch (error) {
        // Если произошла ошибка, обрабатываем её здесь
        console.error('Failed to update task title:', error);
        // Можно выполнить какие-то дополнительные действия, например, показать сообщение об ошибке
        throw error; // Пробрасываем ошибку дальше для обработки в компоненте
    }
};
