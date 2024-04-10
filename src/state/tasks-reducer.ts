import {TaskStateType} from "../AppWithRedux";
import {AddTodolistActionType, instance, RemoveTodolistActionType, todolist1, todolist2} from "./todo-lists-reducer";
import {v4 as uuid} from "uuid";
import {Dispatch} from 'redux';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todoListId: string,
    taskId: string
}
export type InitTaskActionType = {
    type: 'INIT_TASKS',
    tasks: TaskStateType
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    id:string,
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
    RemoveTodolistActionType | InitTaskActionType


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
        case 'INIT_TASKS':
            return {...action.tasks};
        case "REMOVE-TASK": {
            const newTasks = state[action.todoListId].filter(task => action.taskId !== task.id)
            return {...state, [action.todoListId]: newTasks}
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            stateCopy[action.todoListId] = [
                {id: action.id, title: action.taskTitle, isDone: false}
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
export const addTaskAC = (todoListId: string, taskTitle: string,id:string): AddTaskActionType => {
    return {type: 'ADD-TASK', todoListId, taskTitle,id}
}
export const changeTaskStatusAC = (todoListId: string, taskId: string,
                                   isDone: boolean): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', todoListId, taskId, isDone}
}
export const changeTaskTitleAC = (todoListId: string, taskId: string,
                                  taskTitle: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', todoListId, taskId, taskTitle}
}


export const initTasks = () => async (dispatch: Dispatch) => {
    try {
        await instance.get('/tasks').then((response) => {
                     // Группировка задач по todolistId
            interface Task {
                _id: string;
                id: string;
                todolistId: string;
                title: string;
                isDone: boolean;
            }
            const groupedTasks: TaskStateType = {};
            response.data.forEach((task: Task) => {
                if (!groupedTasks[task.todolistId]) {
                    groupedTasks[task.todolistId] = [];
                }
                groupedTasks[task.todolistId].push({
                    id: task.id,
                    title: task.title,
                    isDone: task.isDone
                });
            });
                     dispatch({type: 'INIT_TASKS', tasks: groupedTasks});
        })
    } catch (error) {
        console.error('Failed to fetch tasks:', error);
    }
};
export const addTaskSank = (todoListId: string, taskTitle: string) => async (dispatch: Dispatch) => {
    try {
        // Отправляем POST запрос на сервер для создания новой задачи
        const response = await instance.post('/tasks', {
            id: uuid(),
            todolistId: todoListId,
            title: taskTitle,
            isDone: false // Предполагаю, что изначально задача не выполнена
        });
             // Если запрос выполнен успешно, диспетчеризуем экшен для добавления задачи в состояние
        dispatch(addTaskAC(response.data.todolistId,response.data.title,response.data.id));
    } catch (error) {
        // Если произошла ошибка при выполнении запроса, обрабатываем её здесь
        console.error('Failed to add task:', error);
        // Можно выполнить какие-то дополнительные действия, например, показать сообщение об ошибке
    }
};
export const removeTaskSank = (todoListId: string, taskId: string) => async (dispatch: Dispatch) => {
    try {
        // Отправляем DELETE запрос на сервер для удаления задачи
        await instance.delete(`/tasks/${taskId}`);

        // Если запрос выполнен успешно, диспетчеризуем экшен для удаления задачи из состояния
        dispatch(removeTaskAC(todoListId, taskId));
    } catch (error) {
        // Если произошла ошибка при выполнении запроса, обрабатываем её здесь
        console.error('Failed to remove task:', error);
        // Можно выполнить какие-то дополнительные действия, например, показать сообщение об ошибке
    }
};

