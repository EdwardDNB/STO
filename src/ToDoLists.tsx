import {useSelector} from "react-redux";
import {AppRootState, useAppDispatch} from "./state/store";
import {Grid, Paper} from "@mui/material";
import {Todolist} from "./Todolist";
import React, {useEffect} from "react";
import {ToDoListsTypes} from "./AppWithRedux";
import {initTodoLists} from "./state/todo-lists-reducer";
import {initTasks} from "./state/tasks-reducer";

export const ToDoLists = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(initTodoLists());
        dispatch(initTasks());
    }, [dispatch]);
    const ToDoLists = useSelector<AppRootState, ToDoListsTypes[]>(state => state.todoLists)
    return (
        <Grid container spacing={2}>

            {ToDoLists ? ToDoLists.map(tl => {
                return <Grid key={tl.id} item xs={3}><Paper elevation={3} sx={{padding: '10px'}}>
                    <Todolist
                        id={tl.id}
                        title={tl.title}
                    /></Paper></Grid>
            }) : <div></div>}

        </Grid>
    )
}