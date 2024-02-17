import React, {useState} from 'react';
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


type ToDoListsTypes = {
    id: string,
    title: string,
    filter: FilterValuesTypes
}
type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const task1 = uuid()
    const task2 = uuid()
    const [ToDoLists, setToDoLists] = useState<Array<ToDoListsTypes>>([
        {id: task1, title: 'Posh Panamera', filter: 'All'},
        {id: task2, title: 'Ford Mustang GT', filter: 'All'},
    ])
    let [TasksObj, setTasksObj] = useState<TaskStateType>({
        [task1]: [
            {id: uuid(), title: 'Change engine oil', isDone: true},
            {id: uuid(), title: 'Change rubier', isDone: false},
            {id: uuid(), title: 'Washing', isDone: true},
        ],
        [task2]: [
            {id: uuid(), title: 'Change engine oil', isDone: true},
            {id: uuid(), title: 'Change rubier', isDone: false},
            {id: uuid(), title: 'Washing', isDone: true},
        ],
    })


    let changeFilter = (value: FilterValuesTypes, id: string) => {
        let todolist = ToDoLists.find(tl => tl.id === id)
        if (todolist) {
            todolist.filter = value
            setToDoLists([...ToDoLists])
        }
    }
    const removeTask = (id: string, listId: string) => {
        let tasks = TasksObj[listId]
        TasksObj[listId] = tasks.filter(task => task.id !== id)
        setTasksObj({...TasksObj})
    }
    const removeTodolist = (listId: string) => {
        const filteredTodoLists = ToDoLists.filter(tl => tl.id !== listId)
        setToDoLists(filteredTodoLists)
        delete TasksObj[listId]
        setTasksObj({...TasksObj})
    }
    let addTask = (title: string, listId: string) => {
        TasksObj[listId] = [...TasksObj[listId],
            {id: uuid(), title: title, isDone: false}]
        setTasksObj({...TasksObj})

    }
    let setCompleted = (isDone: boolean, id: string, listId: string) => {
        let task = TasksObj[listId].find(t => t.id === id)
        if (task) {
            task.isDone = isDone
        }
        let copy = {...TasksObj}
        setTasksObj(copy)
    }

    function addTodoList(title: string) {
        const todoList: ToDoListsTypes = {id: uuid(), title: title, filter: 'All'}
        setToDoLists([todoList, ...ToDoLists])
        setTasksObj({[todoList.id]: [], ...TasksObj})
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
                                let task = TasksObj[idList].find(t => t.id === id)
                                if (task) {
                                    task.title = title
                                }
                                let copy = {...TasksObj}
                                setTasksObj(copy)
                            }

                            function changeTodoListTitle(title: string, idList: string): void {
                                const list = ToDoLists.find(l => l.id === idList)
                                if (list) {
                                    list.title = title
                                }
                                setToDoLists([...ToDoLists])
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

export default App;
