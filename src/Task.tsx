import React, {ChangeEvent} from "react";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskSank} from "./state/tasks-reducer";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";
import {useAppDispatch} from "./state/store";

type TaskPropsType = {
    id: string
    task: TaskType

}

export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useAppDispatch()
    const removeTask = () => dispatch(removeTaskSank(props.id, props.task.id))

    function changeTaskTitleHandler(title: string) {
        dispatch(changeTaskTitleAC(props.id, props.task.id, title))
    }

    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.id, props.task.id, e.currentTarget.checked))
    }
       return <div
        className={props.task.isDone ? 'is-done' : ''} key={props.task.id}>
        <Checkbox
            checked={props.task.isDone}
            onChange={changeStatusHandler}
        />
        <EditableSpan title={props.task.title} changeTaskTitle={changeTaskTitleHandler}/>
        <IconButton onClick={removeTask}>
            <Delete/>
        </IconButton>
    </div>
})