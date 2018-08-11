import React from 'react'
import Login from '../user/Login';
import {Route, Redirect} from "react-router"
import './Container.less'

class Container extends React.Component {
    render() {
        return (<div>
                <div className="main">sdfasdfsd</div>
                <Route path="/login" component={Login}/>
                <Redirect from="#/" to="/login"/>
            </div>
        )
    }
}

export default Container;