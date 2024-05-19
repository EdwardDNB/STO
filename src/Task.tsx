import React, {ChangeEvent} from "react";
import {
    removeTaskSank,
    TaskType,
    updateTaskStatusSank,
    updateTaskSuppliesSank,
    updateTaskTitleSank
} from "./state/tasksSlice";
import {Checkbox, IconButton, Box, Paper} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {useAppDispatch} from "./state/store";

type TaskPropsType = {

    task: TaskType;
};

export const Task: React.FC<TaskPropsType> = React.memo(({task}) => {
    const dispatch = useAppDispatch();

    const removeTask = () => dispatch(removeTaskSank(task.id));

    const changeTaskTitleHandler = (title: string) => {
        dispatch(updateTaskTitleSank(task.id, title));
    };
    const updateTaskSuppliesHandler = (title: string) => {
        dispatch(updateTaskSuppliesSank(task.id, title));
    };

    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTaskStatusSank(task.id, e.currentTarget.checked));
    };

    return (
        <Paper
            variant="outlined"
            sx={{
                p: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2
            }}
        >
            <Checkbox
                checked={task.isDone}
                onChange={changeStatusHandler}
            />
            <Box
                sx={{
                    flexGrow: 1,
                    wordBreak: 'break-word',
                    mx: 2
                }}
            >
                <EditableSpan
                    label={'Edit task'}
                    title={task.title}
                    variant='body1'
                    changeTaskTitle={changeTaskTitleHandler}
                />
                <EditableSpan
                    label={'Edit supplies'}
                    title={task.supplies ? task.supplies : "Add supplies"}
                    changeTaskTitle={updateTaskSuppliesHandler}
                    variant='body2'
                    typographySx={{opacity: 0.5, fontStyle: 'italic', wordWrap: 'break-word', cursor: 'pointer'}}
                />
            </Box>
            <IconButton onClick={removeTask} size="small">
                <Delete/>
            </IconButton>
        </Paper>
    );
});
