import React from "react"
import {Form} from "antd"
import "./MainSideBar.less";
import {Layout, Menu, Icon} from "antd";
import {goToPath} from "../util/HistoryUtil";
let {Sider} = Layout;
let SubMenu = Menu.SubMenu;

class SideBar extends React.Component {

    constructor(){
        super();
        this.onCollapse = this.onCollapse.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            collapsed: false,
        };
    }

    onCollapse(collapsed){
        this.setState({collapsed});
    };

    handleClick(e){
        if (e && e.keyPath) {
            let path = "/main";
            let keyPaths = e.keyPath;
            for (let i = keyPaths.length-1; i>=0; --i ){
                path += "/" + keyPaths[i];
            }
            goToPath(path)
        }
    };

    render() {
        return (
            <Sider
                theme="light"
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}>
                <div className="logo"/>
                <Menu theme="light"
                      mode="inline"
                      defaultSelectedKeys={["order"]}
                      onClick={this.handleClick}>
                    <Menu.Item key="order">
                        <Icon type="pie-chart"/>
                        <span>订单管理</span>
                    </Menu.Item>
                    <Menu.Item key="user">
                        <Icon type="desktop"/>
                        <span>用户管理</span>
                    </Menu.Item>
                    <SubMenu
                        key="doc"
                        title={
                            <span>
                                <Icon type="user"/>
                                <span>使用手册</span>
                            </span>}>
                        <Menu.Item key="docOrder">订单</Menu.Item>
                        <Menu.Item key="docUser">用户</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        );
    }
}

let MainSideBar = Form.create()(SideBar);
export default MainSideBar;
