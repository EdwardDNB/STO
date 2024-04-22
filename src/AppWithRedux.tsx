import React from 'react';
import {TaskType} from "./Todolist";
import {ToDoLists} from "./ToDoLists";
import {Header} from "./Header";
import {AddCar} from "./AddCar";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {News} from "./News";
import {About} from "./About";

export type ToDoListsTypes = {
    id: string,
    title: string,
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {


    return (
        <Router>
            <div className={'App'}>
                <Header/>
                <Routes>
                    <Route path="/news" Component={News}/>
                    <Route path="/worked" Component={Worked}/>
                    <Route path="/" Component={About}/>

                </Routes>




            </div>
        </Router>

    );
}



const Worked = () => {
    return <>
        <AddCar/>
        <ToDoLists/>
    </>
}

export default AppWithRedux;
