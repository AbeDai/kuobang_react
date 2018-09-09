import React from 'react'
import Login from '../user/Login';
import {Redirect, Route} from "react-router"
import './Container.less'
import Main from "../main/Main";

class Container extends React.Component {
    render() {
        return (<div className="main">
                <Route path="/main" component={Main}/>
                <Route path="/login" component={Login}/>
                <Redirect from="#/" to="/main/yangPin/list"/>
            </div>
        )
    }
}

export default Container;