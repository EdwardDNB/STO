import {ToDoListsTypes} from "./todolists-reducer.test";
import {v4 as uuid} from "uuid";



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
    | ChangeTodolistTitleActionType
export const todolist1 = uuid()
export const todolist2 = uuid()

const initialState: Array<ToDoListsTypes> = [
    {id: todolist1, title: 'Porsche Panamera'},
    {id: todolist2, title: 'Ford Mustang GT'}
]
export const todoListsReducer = (state: Array<ToDoListsTypes> = initialState, action: ActionsType): ToDoListsTypes[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return [...state.filter(tl => tl.id !== action.id)]
        case 'ADD-TODOLIST':
            return [...state, {
                id: action.todoListId,
                title: action.title,

            }]
        case 'CHANGE-TITLE-TODOLIST':
            return [...state.map(tl => tl.id === action.id
                ?{...tl,id:action.id}
                :tl)]
        default:
            return [...state]
    }
}
export const removeTodolistAC = (todoListId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todoListId} //fabric func
}
export const addTodolistAC = (todoTitle: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: todoTitle, todoListId: uuid()}
}
export const changeTodolistTitleAC = (todoTitle: string, todoListId: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TITLE-TODOLIST', title: todoTitle, id: todoListId}
}
