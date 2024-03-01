import {TaskStateType} from "../App";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todo-lists-reducer";


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
    | ChangeTaskStatusActionType|ChangeTaskTitleActionType |AddTodolistActionType|
    RemoveTodolistActionType


export const tasksReducer = (state: TaskStateType, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            const tasksOfOurTodoList = stateCopy[action.todoListId]
            stateCopy[action.todoListId] = tasksOfOurTodoList.filter(task => task.id != action.taskId)
            return stateCopy
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            stateCopy[action.todoListId] = [
                {id: '0', title: 'Repair disks', isDone: false}
                , ...stateCopy[action.todoListId]]
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            const stateCopy = {...state}
           const tasks= stateCopy[action.todoListId]
            const task=tasks.find(task=>task.id===action.taskId)
            if(task){
                task.isDone=action.isDone
            }
            return stateCopy
        }
        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state}
           const tasks= stateCopy[action.todoListId]
            const task=tasks.find(task=>task.id===action.taskId)
            if(task){
                task.title=action.taskTitle
            }
            return stateCopy
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
           stateCopy[action.todoListId]=[]
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
          if(stateCopy[action.id]){
             delete stateCopy[action.id]
          }
            return stateCopy
        }
        default:
            throw new Error('Action type not found')
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
    return {type: 'CHANGE-TASK-STATUS', todoListId, taskId,isDone}
}
export const changeTaskTitleAC = (todoListId: string, taskId: string,
                                  taskTitle: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', todoListId, taskId,taskTitle}
}

