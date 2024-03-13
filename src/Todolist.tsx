import React, {ChangeEvent} from "react";
import './Todolist.css'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todo-lists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {AppRootState} from "./state/store";

type PropsTypes = {
    id: string,
    title: string,
    filter: FilterValuesTypes,

}
export type TaskType = {
    id: string, title: string, isDone: boolean
}
export type FilterValuesTypes = 'All' | 'Active' | 'Completed'


export function Todolist(props: PropsTypes) {
    const dispatch = useDispatch()
    let tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[props.id])
    if (props.filter === 'Completed') {
        tasks = tasks.filter(t => t.isDone)
    }
    if (props.filter === 'Active') {
        tasks = tasks.filter(t => !t.isDone)
    }

    let changeFilter = (value: FilterValuesTypes, id: string) => {
        dispatch(changeTodolistFilterAC(value, id))
    }
    const filterActive = () => {
        changeFilter('Active', props.id)
    }
    const filterCompleted = () => {
        changeFilter('Completed', props.id)
    }
    const filterAll = () => {
        changeFilter('All', props.id)
    }
    function removeTodolist() {
        dispatch(removeTodolistAC(props.id))
    }
    function addTask(title: string) {
        dispatch(addTaskAC(props.id, title))
    }
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
                    tasks.map(t => {
                        const removeTask = () => dispatch(removeTaskAC(props.id, t.id))

                        function changeTaskTitle(title: string) {
                            dispatch(changeTaskTitleAC(props.id, t.id, title))
                        }

                        const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            dispatch(changeTaskStatusAC(props.id, t.id, e.currentTarget.checked))
                        }

                        return <div
                            className={t.isDone ? 'is-done' : ''} key={t.id}>
                            <Checkbox
                                checked={t.isDone}
                                onChange={changeStatusHandler}
                            />
                            <EditableSpan title={t.title} changeTaskTitle={changeTaskTitle}/>
                            <IconButton onClick={removeTask}>
                                <Delete/>
                            </IconButton>
                        </div>
                    })
                }
            </>
            <Button variant={props.filter === 'All' ? 'contained' : 'text'}
                    onClick={filterAll}>All
            </Button>
            <Button variant={props.filter === 'Active' ? 'contained' : 'text'}
                    onClick={filterActive}>Active
            </Button>
            <Button variant={props.filter === 'Completed' ? 'contained' : 'text'}
                    onClick={filterCompleted}>Completed
            </Button>
        </div>
    )
}
