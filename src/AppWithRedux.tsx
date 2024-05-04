import React from 'react';
import {TaskType} from "./Todolist";
import {Header} from "./Header";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {News} from "./News";
import {About} from "./About";
import {DailyWorks} from "./DailyWorks";
import {PhoneList} from "./PhoneList";
import {Authentication} from "./Authentication";

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
                    <Route path="/worked" Component={DailyWorks}/>
                    <Route path="/" Component={About}/>
                    <Route path="/phone-orders" Component={PhoneList}/>
                    <Route path="/login" Component={Authentication}/>

                </Routes>
            </div>
        </Router>
    );
}


export default AppWithRedux;
