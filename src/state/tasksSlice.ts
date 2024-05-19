// src/state/tasksSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {v4 as uuid} from 'uuid';
import {instance} from "./todo-lists-reducer";
import {AppDispatch} from "./store";


export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
    supplies: string;
    orderId: string;
};

type TasksState = {
    tasks: TaskType[];
};

const initialState: TasksState = {
    tasks: []
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        initializeTasks(state, action: PayloadAction<TaskType[]>) {
            state.tasks = action.payload;
        },
        addTask(state, action: PayloadAction<TaskType>) {
            state.tasks.push(action.payload);
        },
        removeAllOrderTasks(state, action: PayloadAction<{ orderId: string }>) {
            state.tasks = state.tasks.filter(task => task.orderId !== action.payload.orderId);
        },
        removeTask(state, action: PayloadAction<string>) {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
        editTaskTitle(state, action: PayloadAction<{ id: string; title: string }>) {
            const task = state.tasks.find(task => task.id === action.payload.id);
            if (task) {
                task.title = action.payload.title;
            }
        },
        editTaskSupplies(state, action: PayloadAction<{ id: string; supplies: string }>) {
            const task = state.tasks.find(task => task.id === action.payload.id);
            if (task) {
                task.supplies = action.payload.supplies;
            }
        },
        editTaskStatus(state, action: PayloadAction<{ id: string; isDone: boolean }>) {
            const task = state.tasks.find(task => task.id === action.payload.id);
            if (task) {
                task.isDone = action.payload.isDone;
            }
        }
    }
});

export const {
    initializeTasks,
    addTask,
    removeAllOrderTasks,
    editTaskStatus,
    removeTask,
    editTaskTitle,
    editTaskSupplies
} = tasksSlice.actions;

export const initTasks = () => async (dispatch: AppDispatch) => {
    try {
        const response = await instance.get('/tasks')
        dispatch(initializeTasks(response.data));
    } catch (error) {
        console.error('Failed to fetch tasks:', error);
    }
}
export const addTaskSank = (orderId: string, taskTitle: string) => async (dispatch: AppDispatch) => {
    const generatedTaskId = uuid()
    try {
        const response = await instance.post('/tasks', {
            id: generatedTaskId,
            orderId: orderId,
            title: taskTitle,
        });
        dispatch(addTask(response.data));
    } catch (error) {
        console.error('Failed to add task:', error);
    }
};
export const removeTaskSank = (taskId: string) => async (dispatch: AppDispatch) => {
    try {
           await instance.delete(`/tasks/${taskId}`);
          dispatch(removeTask(taskId));
    } catch (error) {
              console.error('Failed to remove task:', error);
       }
};
export const removeOrderTasksSank = (orderId: string) => async (dispatch: AppDispatch) => {
    try {
           await instance.delete(`/tasksclear/${orderId}`);
          dispatch(removeAllOrderTasks({orderId}));
    } catch (error) {
              console.error('Failed to remove task:', error);
       }
};
export const updateTaskSuppliesSank = (id: string, supplies: string) => async (dispatch: AppDispatch) => {
    try {
             await instance.put(`/tasksSupplies/${id}`, {supplies});

        dispatch(editTaskSupplies({id, supplies}))

    } catch (error) {
        console.error('Failed to update task title:', error);
    }
};
export const updateTaskTitleSank = (id: string, title: string) => async (dispatch: AppDispatch) => {
    try {
        await instance.put(`/tasks/${id}`, {title});

        dispatch(editTaskTitle({id, title}))
    } catch (error) {
              console.error('Failed to update task title:', error);
      }
};
export const updateTaskStatusSank = ( id: string, isDone: boolean) => async (dispatch: AppDispatch) => {
    try {
        await instance.put(`/tasks/changeTaskStatus/${id}`, {isDone});
        dispatch(editTaskStatus({id, isDone}))
    } catch (error) {
          console.error('Failed to update task status:', error);
       }};


export default tasksSlice.reducer;
