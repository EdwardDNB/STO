import React, {useState} from 'react';
import './App.css';
import {FilterValuesTypes, TaskType, Todolist} from "./Todolist";
import {v4 as uuid} from 'uuid';
import {types} from "util";

type ToDoListsTypes = {
    id: string,
    title: string,
    filter: FilterValuesTypes
}

function App() {
    const task1 = uuid()
    const task2 = uuid()
    const [ToDoLists, setToDoLists] = useState<Array<ToDoListsTypes>>([
        {id: task1, title: 'Posh Panamera', filter: 'All'},
        {id: task2, title: 'Ford Mustang GT', filter: 'Active'},
    ])
    let [TasksObj, setTasksObj] = useState({
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


    return (
        <div className={'App'}>
            {
                ToDoLists.map(tl => {
                    let taskForList = TasksObj[tl.id]
                    if (tl.filter === 'Completed') {
                        taskForList = taskForList.filter(t => t.isDone)
                    }
                    if (tl.filter === 'Active') {
                        taskForList = taskForList.filter(t => !t.isDone)
                    }
                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title} task={taskForList} removeTask={removeTask}
                        changeFilter={changeFilter} addTask={addTask}
                        setCompleted={setCompleted}
                        filter={tl.filter}
                    />
                })
            }

        </div>

    );
}

export default App;
