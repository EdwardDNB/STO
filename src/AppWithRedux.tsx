import React, {useCallback, useEffect} from 'react';
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Grid, Paper} from "@mui/material";
import {
    addTodolistAC, addTodolistSank, initTodoLists
} from "./state/todo-lists-reducer";
import { useSelector} from "react-redux";
import {AppRootState, useAppDispatch} from "./state/store";
import {initTasks} from "./state/tasks-reducer";


export type ToDoListsTypes = {
    id: string,
    title: string,
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(initTodoLists());
        dispatch(initTasks());
    }, [dispatch,initTodoLists,initTasks]);
    const ToDoLists = useSelector<AppRootState, ToDoListsTypes[]>(state => state.todoLists)

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistSank(title))
    }, [])


    return (
        <div className={'App'}>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box sx={{padding: '10px'}}><AddItemForm addItem={addTodoList} label={'add car'}/></Box>
            <Grid container spacing={2}>

                {ToDoLists?ToDoLists.map(tl => {
                    return <Grid key={tl.id} item xs={3}><Paper elevation={3} sx={{padding: '10px'}}>
                        <Todolist
                             id={tl.id}
                            title={tl.title}
                        /></Paper></Grid>
                }):<div></div>}

            </Grid>


        </div>

    );
}

export default AppWithRedux;
