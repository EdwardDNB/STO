import {TaskStateType} from "./LR4-tasks-reducer.test";


export type RemoveTaskType = {
    type: 'REMOVE-TASK',
    todoListId: string,
    taskId: string
}
export type Action2Type = {
    type: '2',
    title: string
}

export type ActionsType = RemoveTaskType | Action2Type


export const tasksReducer = (state: TaskStateType, action: ActionsType):TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            const tasksOfOurTodoList = stateCopy[action.todoListId]
            stateCopy[action.todoListId] = tasksOfOurTodoList.filter(task => task.id != action.taskId)
            return stateCopy
        }
        case "2": {
            return {...state}
        }
        default:
            throw new Error('Action type not found')
    }
}
export const removeTaskAC = (todoListId: string, taskId: string): RemoveTaskType => {
    return {type: 'REMOVE-TASK', todoListId, taskId}
}
export const action2AC = (todoTitle: string): Action2Type => {
    return {type: '2', title: todoTitle}
}

