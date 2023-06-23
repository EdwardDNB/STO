import React, {useState} from 'react';
import './App.css';
import {FilterValuesTypes, TaskType, Todolist} from "./Todolist";
import { v4 as uuid } from 'uuid';

function App() {
    let [Tasks,setTasks]=useState<TaskType[]>([
        {id:uuid(),title:'Change engine oil',isDone:true},
        {id:uuid(),title:'Change rubier',isDone:false},
        {id:uuid(),title:'Washing',isDone:true},
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
            <Todolist title={'Posh Panamera'} task={taskForList} removeTask={removeTask}
                      changeFilter={changeFilter} addTask={addTask}
                      setCompleted={setCompleted}
                      filter={filter}
            />
        </div>

    );
}

export default App;
