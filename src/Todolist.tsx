import React, { useCallback, useState} from "react";
import './Todolist.css'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {changeTodolistTitleAC, removeTodolistAC} from "./state/todo-lists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {addTaskAC} from "./state/tasks-reducer";
import {AppRootState} from "./state/store";
import {Task} from "./Task";

type PropsTypes = {
    id: string,
    title: string,

}
export type TaskType = {
    id: string, title: string, isDone: boolean
}
export type FilterValuesTypes = 'All' | 'Active' | 'Completed'


export function Todolist(props: PropsTypes) {
    const dispatch = useDispatch()
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
        dispatch(removeTodolistAC(props.id))
    }

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(props.id, title))
    }, [dispatch, props.id, addTaskAC])

    function changeTodoListTitle(title: string) {
        dispatch(changeTodolistTitleAC(title, props.id))
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
                {
                    tasks.map(task =>
                        <Task task={task} id={props.id} key={task.id}/>
                    )
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
