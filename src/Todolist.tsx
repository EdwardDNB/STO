import React, {useCallback, useState} from "react";
import './Todolist.css'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {changeTodolistTitleAC, removeTodolistSank, updateTodolistTitleSank} from "./state/todo-lists-reducer";
import {useSelector} from "react-redux";
import {addTaskSank} from "./state/tasks-reducer";
import {AppRootState, useAppDispatch} from "./state/store";
import {Task} from "./Task";

type PropsTypes = {
    id: string,
    title: string,

}
export type TaskType = {
    id: string, title: string, isDone: boolean
}
export type FilterValuesTypes = 'All' | 'Active' | 'Completed'


export const Todolist=(props: PropsTypes)=>{
    const dispatch = useAppDispatch()
    let tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[props.id])
    let [filter, setFilter] = useState<FilterValuesTypes>('All')
    if (filter === 'Completed') {
        tasks = tasks.filter(t => t.isDone)
    }
    if (filter === 'Active') {
        tasks = tasks.filter(t => !t.isDone)
    }

    const filterActive = () => {
        setFilter('Active')
    }
    const filterCompleted = () => {
        setFilter('Completed')
    }
    const filterAll = () => {
        setFilter('All')
    }

    function removeTodolist() {
        dispatch(removeTodolistSank(props.id))
    }

    const addTask = useCallback((title: string) => {
        dispatch(addTaskSank(props.id, title))
    }, [dispatch, props.id])

    function changeTodoListTitle(title: string) {
        dispatch(updateTodolistTitleSank(title, props.id))
    }



    return (
        <div>

            <h3><EditableSpan changeTaskTitle={changeTodoListTitle} title={props.title}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} label={'add task'}/>
            <>
                {tasks ?
                    tasks.map(task =>
                        <Task task={task} id={props.id} key={task.id}/>
                    ) : <div></div>
                }
            </>
            <Button variant={filter === 'All' ? 'contained' : 'text'}
                    onClick={filterAll}>All
            </Button>
            <Button variant={filter === 'Active' ? 'contained' : 'text'}
                    onClick={filterActive}>Active
            </Button>
            <Button variant={filter === 'Completed' ? 'contained' : 'text'}
                    onClick={filterCompleted}>Completed
            </Button>
        </div>
    )
}
