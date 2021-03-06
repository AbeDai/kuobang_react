import React from "react"
import {Layout} from "antd";
import "./MainContent.less";
import {Route} from "react-router";
import Order from "../order/Order";
import User from "../user/User";
import OrderDoc from "../doc/OrderDoc";
import UserDoc from "../doc/UserDoc";
import {UserEditor} from "../user/UserEditor";
import {NewUser} from "../user/NewUser"
import {YangPinNew} from "../order/YangPinNew";
import {YangPinDetail} from "../order/YangPinDetail";

let {Content} = Layout;

class MainContent extends React.Component {

    render() {
        return (
            <Content className="main_content">
                <Route path="/main/yangPin/list" component={Order}/>
                <Route path="/main/yangPin/add" component={YangPinNew}/>
                <Route path="/main/yangPin/detail" component={YangPinDetail}/>
                <Route path="/main/user/list" component={User}/>
                <Route path="/main/user/editor" component={UserEditor}/>
                <Route path="/main/user/add" component={NewUser}/>
                <Route path="/main/doc/docOrder" component={OrderDoc}/>
                <Route path="/main/doc/docUser" component={UserDoc}/>
            </Content>
        );
    }
}

export default MainContent;
