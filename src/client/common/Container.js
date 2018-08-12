import React from 'react'
import Login from '../user/Login';
import {Route, Redirect} from "react-router"
import './Container.less'
import Main from "../main/Main";
import {requireAuthentication} from "../util/LoginUtil";

class Container extends React.Component {
    render() {
        return (<div className="main">
                <Route path="/main" component={requireAuthentication(Main)}/>
                <Route path="/login" component={Login}/>
                <Redirect from="#/" to="/login"/>
            </div>
        )
    }
}

export default Container;