import React from "react"
import {Layout} from "antd";
import "./MainContent.less";
import {Route} from "react-router";
import Order from "../order/Order";
import User from "../user/User";
import OrderDoc from "../doc/OrderDoc";
import UserDoc from "../doc/UserDoc";
let {Content} = Layout;

class MainContent extends React.Component {

    render() {
        return (
            <Content className="main_content">
                <Route path="/main/order" component={Order} />
                <Route path="/main/user" component={User} />
                <Route path="/main/doc/docOrder" component={OrderDoc} />
                <Route path="/main/doc/docUser" component={UserDoc} />
            </Content>
        );
    }
}

export default MainContent;
