import React from 'react';
import {Header} from "./Header";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {News} from "./News";
import {About} from "./About";
import { TodayWorks} from "./TodayWorks";
import {PhoneList} from "./PhoneList";
import {Authentication} from "./Authentication";
import {OrdersList} from "./OrdersList";




function AppWithRedux() {


    return (
        <Router>
            <div className={'App'}>
                <Header/>
                <Routes>
                    <Route path="/news" Component={News}/>
                    <Route path="/worked" Component={TodayWorks}/>
                    <Route path="/" Component={About}/>
                    <Route path="/phone-orders" Component={PhoneList}/>
                    <Route path="/login" Component={Authentication}/>
                    <Route path="/orders" Component={OrdersList}/>

                </Routes>
            </div>
        </Router>
    );
}


export default AppWithRedux;
