import React from "react"
import {Form} from "antd"
import "./MainSideBar.less";
import {Layout, Menu, Icon} from "antd";
import {goToPath} from "../util/HistoryUtil";
import {getUserInfo} from "../util/LoginUtil";

let {Sider} = Layout;
let SubMenu = Menu.SubMenu;

class SideBar extends React.Component {

    constructor() {
        super();
        this.onCollapse = this.onCollapse.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getUserManagerModule = this.getUserManagerModule.bind(this);
        this.state = {
            collapsed: false,
        };
    }

    /**
     * 侧边栏展开操作
     */
    onCollapse(collapsed) {
        this.setState({collapsed});
    };

    /**
     * 页面跳转
     */
    handleClick(e) {
        if (e && e.keyPath) {
            let path = "/main";
            let keyPaths = e.keyPath;
            for (let i = keyPaths.length - 1; i >= 0; --i) {
                path += "/" + keyPaths[i];
            }
            goToPath(path)
        }
    };

    /**
     * 生成用户管理模块
     */
    getUserManagerModule(){
        let needShowUserManager = getUserInfo()["UserAuthority"] === 2;
        if (needShowUserManager) {
            return (<Menu.Item key="user/list">
                <Icon type="desktop"/>
                <span>用户管理</span>
            </Menu.Item>)
        }else {
            return null;
        }
    }

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
                    {this.getUserManagerModule()}
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
