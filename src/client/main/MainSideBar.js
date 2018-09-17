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
    getUserManagerModule() {
        let needShowUserManager = getUserInfo()["UserAuthority"] === 2;
        if (needShowUserManager) {
            return (<Menu.Item key="user/list">
                <Icon type="user"/>
                <span>职员管理</span>
            </Menu.Item>)
        } else {
            return (<Menu.Item key="user/list">
                <Icon type="user"/>
                <span>职员列表</span>
            </Menu.Item>)
        }
    }

    render() {
        return (
            <Sider
                theme="light"
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}>
                <div className="logoDiv">
                    <img className="img" src="http://daiyibo.oss-cn-hongkong.aliyuncs.com/kuobang_logo.svg"/>
                    <span className="text">阔邦贸易</span>
                </div>
                <Menu theme="light"
                      mode="inline"
                      defaultOpenKeys={["yangPin", "doc"]}
                      defaultSelectedKeys={["list"]}
                      onClick={this.handleClick}>
                    <SubMenu
                        key="yangPin"
                        title={
                            <span>
                                <Icon type="profile" theme="outlined" />
                                <span>样品管理</span>
                            </span>}>
                        <Menu.Item key="list">样品列表</Menu.Item>
                        <Menu.Item key="add">添加样品</Menu.Item>
                    </SubMenu>
                    {this.getUserManagerModule()}
                    <SubMenu
                        key="doc"
                        title={
                            <span>
                                <Icon type="question" theme="outlined" />
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
