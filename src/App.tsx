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
    let [Tasks, setTasks] = useState<TaskType[]>([
        {id: uuid(), title: 'Change engine oil', isDone: true},
        {id: uuid(), title: 'Change rubier', isDone: false},
        {id: uuid(), title: 'Washing', isDone: true},
    ])

    let changeFilter = (value: FilterValuesTypes, id:string) => {
       let todolist=ToDoLists.find(tl=>tl.id===id)
        if(todolist){
            todolist.filter=value
            setToDoLists([...ToDoLists])
        }
    }
    const removeTask = (id: string) => {
        setTasks(Tasks.filter(t => t.id !== id))
    }

    let addTask = (title: string) => {
        setTasks([{id: uuid(), title: title, isDone: false}, ...Tasks])
    }
    let setCompleted = (isDone: boolean, id: string) => {
        let task = Tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
        }
        let copy = [...Tasks]
        setTasks(copy)
    }

    const [ToDoLists,setToDoLists] =useState <Array<ToDoListsTypes>>([
        {id: uuid(), title: 'Posh Panamera', filter: 'All'},
        {id: uuid(), title: 'Ford Mustang GT', filter: 'Active'},
    ])
    return (
        <div className={'App'}>
            {
                ToDoLists.map(tl => {
                    let taskForList = Tasks
                    if (tl.filter === 'Completed') {
                        taskForList = Tasks.filter(t => t.isDone)
                    }
                    if (tl.filter === 'Active') {
                        taskForList = Tasks.filter(t => !t.isDone)
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
