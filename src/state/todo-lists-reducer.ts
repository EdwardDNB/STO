import {ToDoListsTypes} from "./todolists-reducer.test";
import {v4 as uuid} from "uuid";

type FilterValuesTypes = 'All' | 'Active' | 'Completed'

type RemoveTodolistActionType={
    type:'REMOVE-TODOLIST',
    id:string
    }
  type AddTodolistActionType={
        type: 'ADD-TODOLIST',
        title: string
        todoListId:string
    }
   type ChangeTodolistTitleActionType={
        type: 'CHANGE-TITLE-TODOLIST',
        title: string,
        id:string
    }
    type ChangeTodolistFilterActionType={
        type: 'CHANGE-FILTER-TODOLIST',
        filter: FilterValuesTypes,id:string
    }
export type ActionsType=RemoveTodolistActionType|AddTodolistActionType
    |ChangeTodolistFilterActionType|ChangeTodolistTitleActionType

export const todoListsReducer = (state: Array<ToDoListsTypes>, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id != action.id)
        case 'ADD-TODOLIST':
            return [...state, {
                id: action.todoListId,
                title: action.title,
                filter: 'All'
            }]
        case 'CHANGE-TITLE-TODOLIST':
            let el = state.find(tl => tl.id === action.id)
            if (el) {
                el.title = action.title
            }
            return [...state]
        case 'CHANGE-FILTER-TODOLIST':
            let fel = state.find(tl => tl.id === action.id)
            if (fel) {
                fel.filter = action.filter
            }
            return [...state]
        default:
            throw new Error('Action type not found')
    }
}
export const removeTodolistAC=(todoListId:string):RemoveTodolistActionType=>{
return {type: 'REMOVE-TODOLIST', id: todoListId} //fabric func
}
export const addTodolistAC=(todoTitle:string):AddTodolistActionType=>{
return {type: 'ADD-TODOLIST', title: todoTitle,todoListId:uuid()}
}
export const changeTodolistTitleAC=(todoTitle:string,todoListId:string):ChangeTodolistTitleActionType=>{
return {type: 'CHANGE-TITLE-TODOLIST', title: todoTitle,id:todoListId}
}
export const changeTodolistFilterAC=(todolistFilter:FilterValuesTypes,todoListId:string):ChangeTodolistFilterActionType=>{
return {type: 'CHANGE-FILTER-TODOLIST', filter: todolistFilter,id:todoListId}
}
