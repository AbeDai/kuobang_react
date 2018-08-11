import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import Container from '../common/Container'
import {Router, Route} from "react-router"
import registerServiceWorker from './registerServiceWorker';
import {createHashHistory} from 'history';

const root = (
    <Router history={createHashHistory()}>
        <Route path="/" component={Container}/>
    </Router>
);

ReactDOM.render(<div>{root}</div>, document.getElementById('root'));
registerServiceWorker();
