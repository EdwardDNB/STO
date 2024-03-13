import {TaskStateType} from "../AppWithRedux";
import {AddTodolistActionType, RemoveTodolistActionType, todolist1, todolist2} from "./todo-lists-reducer";
import {v4 as uuid} from "uuid";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todoListId: string,
    taskId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    todoListId: string,
    taskTitle: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todoListId: string,
    taskId: string,
    isDone: boolean
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todoListId: string,
    taskId: string,
    taskTitle: string
}

export type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodolistActionType |
    RemoveTodolistActionType


let initialState: TaskStateType = {
    [todolist1]: [
        {id: uuid(), title: 'Change engine oil', isDone: true},
        {id: uuid(), title: 'Change rubier', isDone: false},
        {id: uuid(), title: 'Washing', isDone: true},
    ],
    [todolist2]: [
        {id: uuid(), title: 'Change engine oil', isDone: true},
        {id: uuid(), title: 'Change rubier', isDone: false},
        {id: uuid(), title: 'Washing', isDone: true},
    ],
};
export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const newTasks = state[action.todoListId].filter(task => action.taskId != task.id)
            return {...state, [action.todoListId]: newTasks}
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            stateCopy[action.todoListId] = [
                {id: uuid(), title: action.taskTitle, isDone: false}
                , ...stateCopy[action.todoListId]]
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            const stateCopy = {...state}
            stateCopy[action.todoListId] = stateCopy[action.todoListId].map(task => task.id === action.taskId ? {
                ...task,
                isDone: action.isDone
            } : task)
            return stateCopy
        }
        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state}
            stateCopy[action.todoListId] = stateCopy[action.todoListId].map(task => task.id === action.taskId ? {
                ...task,
                title: action.taskTitle
            } : task)
            return stateCopy
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todoListId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            if (stateCopy[action.id]) {
                delete stateCopy[action.id]
            }
            return stateCopy
        }
        default:
            return state
    }
}
export const removeTaskAC = (todoListId: string, taskId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todoListId, taskId}
}
export const addTaskAC = (todoListId: string, taskTitle: string): AddTaskActionType => {
    return {type: 'ADD-TASK', todoListId, taskTitle}
}
export const changeTaskStatusAC = (todoListId: string, taskId: string,
                                   isDone: boolean): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', todoListId, taskId, isDone}
}
export const changeTaskTitleAC = (todoListId: string, taskId: string,
                                  taskTitle: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', todoListId, taskId, taskTitle}
}

