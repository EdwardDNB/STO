import React, {ChangeEvent} from "react";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    id: string
    task: TaskType

}

export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch()
    const removeTask = () => dispatch(removeTaskAC(props.id, props.task.id))

    function changeTaskTitle(title: string) {
        dispatch(changeTaskTitleAC(props.id, props.task.id, title))
    }

    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.id, props.task.id, e.currentTarget.checked))
    }
    console.log('task renderer',props.task)
    return <div
        className={props.task.isDone ? 'is-done' : ''} key={props.task.id}>
        <Checkbox
            checked={props.task.isDone}
            onChange={changeStatusHandler}
        />
        <EditableSpan title={props.task.title} changeTaskTitle={changeTaskTitle}/>
        <IconButton onClick={removeTask}>
            <Delete/>
        </IconButton>
    </div>
})