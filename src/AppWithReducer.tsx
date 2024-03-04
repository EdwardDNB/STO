import React, {useReducer, useState} from 'react';
import './App.css';
import {FilterValuesTypes, TaskType, Todolist} from "./Todolist";
import {v4 as uuid} from 'uuid';
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
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todoListsReducer
} from "./state/todo-lists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";


export type ToDoListsTypes = {
    id: string,
    title: string,
    filter: FilterValuesTypes
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducer() {
    const todolist1 = uuid()
    const todolist2 = uuid()
    const [ToDoLists, dispatchToDoListsReducer] = useReducer(todoListsReducer,[
        {id: todolist1, title: 'Porsche Panamera', filter: 'All'},
        {id: todolist2, title: 'Ford Mustang GT', filter: 'All'}
    ])
    let [TasksObj, dispatchTasksReducer] = useReducer(tasksReducer,{
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
    })


    let changeFilter = (value: FilterValuesTypes, id: string) => {
        const action=changeTodolistFilterAC(value,id)
        dispatchToDoListsReducer(action)
    }
    const removeTask = (id: string, listId: string) => {
       const action=removeTaskAC(listId,id)
        dispatchTasksReducer(action)
    }
    const removeTodolist = (listId: string) => {
       const action=removeTodolistAC(listId)
        dispatchToDoListsReducer(action)
    }
    let addTask = (title: string, listId: string) => {
    const action=addTaskAC(listId,title)
      dispatchTasksReducer(action)
    }
    let setCompleted = (isDone: boolean, id: string, listId: string) => {
       const action=changeTaskStatusAC(listId,id,isDone)
        dispatchTasksReducer(action)
    }

    function addTodoList(title: string) {
        const action=addTodolistAC(title)
        dispatchToDoListsReducer(action)
    }

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

                    {ToDoLists.map(tl => {
                            let taskForList = TasksObj[tl.id]
                            if (tl.filter === 'Completed') {
                                taskForList = taskForList.filter(t => t.isDone)
                            }
                            if (tl.filter === 'Active') {
                                taskForList = taskForList.filter(t => !t.isDone)
                            }

                            function changeTaskTitle(id: string, title: string, idList: string) {
                                const action=changeTaskTitleAC(idList,id,title)
                                dispatchTasksReducer(action)
                            }

                            function changeTodoListTitle(title: string, idList: string): void {
                                const action=changeTodolistTitleAC(title,idList)
                                dispatchToDoListsReducer(action)
                            }

                            return <Grid item xs={3} ><Paper elevation={3} sx={{padding: '10px'}} ><Todolist
                                changeTodoListTitle={changeTodoListTitle}
                                changeTaskTitle={changeTaskTitle}
                                key={tl.id}
                                id={tl.id}
                                title={tl.title} task={taskForList} removeTask={removeTask}
                                changeFilter={changeFilter} addTask={addTask}
                                setCompleted={setCompleted}
                                filter={tl.filter}
                                removeTodolist={removeTodolist}
                            /></Paper></Grid>
                        })}

            </Grid>


        </div>

    );
}

export default AppWithReducer;
