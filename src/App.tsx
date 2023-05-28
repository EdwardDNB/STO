import React, {useState} from 'react';
import './App.css';
import {FilterValuesTypes, TaskType, Todolist} from "./Todolist";
import { v4 as uuid } from 'uuid';

function App() {
    let [Tasks,setTasks]=useState<TaskType[]>([
        {id:uuid(),title:'Porch',isDone:true},
        {id:uuid(),title:'Tesla',isDone:false},
        {id:uuid(),title:'Jeep',isDone:true},
    ])
    let [filter,setFilter]=useState<FilterValuesTypes>('All')
    let changeFilter=(value:FilterValuesTypes)=>{
    setFilter(value)
    }
    const removeTask=(id:string)=>{
        setTasks(Tasks.filter(t=>t.id!==id))
    }
    let taskForList=Tasks
    let addTask=(title:string)=>{
        setTasks([{id: uuid(), title: title, isDone: false},...Tasks])
    }
    let setCompleted=(isDone: boolean,id:string)=>{
let task=Tasks.find(t=>t.id===id)
        if(task){task.isDone=isDone}
        let copy=[...Tasks]
        setTasks(copy)
    }
    if(filter==='Completed'){
taskForList=Tasks.filter(t=>t.isDone)
    }
    if(filter==='Active'){
taskForList=Tasks.filter(t=>!t.isDone)
    }
    return (
        <div className={'App'}>
            <Todolist title={'Cars'} task={taskForList} removeTask={removeTask}
                      changeFilter={changeFilter} addTask={addTask}
                      setCompleted={setCompleted}
            />
        </div>

    );
}

export default App;
