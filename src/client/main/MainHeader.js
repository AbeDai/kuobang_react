import React from "react";
import {Menu, Icon, Layout} from "antd";
import "./MainHeader.less";
import {clearUserCookie, getUserInfo} from "../util/LoginUtil";
import {getCurrentPath, goToPath} from "../util/HistoryUtil";

let {Header} = Layout;
let SubMenu = Menu.SubMenu;

class MainHeader extends React.Component {

    constructor() {
        super();

        this.doHeadMenu = this.doHeadMenu.bind(this);
        this.state = {
            username: getUserInfo()["UserNick"]
        }
    }

    /**
     * 下拉菜单栏
     */
    doHeadMenu(item) {
        if (item.key === "logout") {
            clearUserCookie();
            goToPath("/login");
        }
    };

    render() {
        return (
            <Header className="main_header">
                <p className="main_header_path">{getCurrentPath()}</p>
                <Menu mode="horizontal" className="main_header_mine" onClick={this.doHeadMenu}>
                    <SubMenu title={<div><Icon type="user"/>{this.state.username}</div>}>
                        <Menu.Item key="logout">退出登录</Menu.Item>
                    </SubMenu>
                </Menu>
            </Header>
        );
    }
}

export default MainHeader;
