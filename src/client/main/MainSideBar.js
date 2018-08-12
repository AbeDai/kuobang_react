import React from "react"
import {Form} from "antd"
import "./MainSideBar.less";
import {Layout, Menu, Icon} from "antd";
let {Sider} = Layout;
let SubMenu = Menu.SubMenu;

class SideBar extends React.Component {
    state = {
        collapsed: false
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({collapsed});
    };

    handleClick = (e) => {
        if (e && e.key) {
            alert(e.key);
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
                <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline"
                      onClick={this.handleClick}>
                    <Menu.Item key="1">
                        <Icon type="pie-chart"/>
                        <span>Option 111</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="desktop"/>
                        <span>Option 2</span>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                    <Icon type="user"/>
                                    <span>User</span>
                                </span>}>
                        <Menu.Item key="3">Tom</Menu.Item>
                        <Menu.Item key="4">Bill</Menu.Item>
                        <Menu.Item key="5">Alex</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={
                            <span>
                                    <Icon type="team"/>
                                    <span>Team</span>
                                </span>}>
                        <Menu.Item key="6">Team 1</Menu.Item>
                        <Menu.Item key="8">Team 2</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9">
                        <Icon type="file"/>
                        <span>File</span>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

let MainSideBar = Form.create()(SideBar);
export default MainSideBar;
