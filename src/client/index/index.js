import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import Container from '../common/Container'
import {Router, Route} from "react-router"
import registerServiceWorker from './registerServiceWorker';
import {createHashHistory} from 'history';
import {requireAuthentication} from "../util/LoginUtil";

export let history = createHashHistory();
const root = (
    <Router history={history}>
        <Route path="/" component={requireAuthentication(Container)}/>
    </Router>
);

ReactDOM.render(<div>{root}</div>, document.getElementById('root'));
registerServiceWorker();
