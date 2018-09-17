import React from "react";
import {Menu, Icon, Layout} from "antd";
import "./MainHeader.less";
import {clearUserCookie, getUserInfo} from "../util/LoginUtil";
import {getCurrentPath, goToPath} from "../util/HistoryUtil";
import FormModal from "../common/FormModal";
import {checkRulePassword} from "../util/CheckRuleUtil";
import Input from "antd/es/input/Input";
import {notificationError, notificationInfo} from "../util/NotificationUtil";
import {post} from "../util/NetWorkUtil";
import {hexMD5} from "../util/MD5Util";
import {Breadcrumb} from 'antd';
import {Link} from "react-router-dom";

let {Header} = Layout;
let SubMenu = Menu.SubMenu;

class MainHeader extends React.Component {

    constructor() {
        super();
        this.logout = this.logout.bind(this);
        this.doHeadMenu = this.doHeadMenu.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
        this.renderPasswordModal = this.renderPasswordModal.bind(this);
        this.showPassword = this.showPassword.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.renderBreadcrumb = this.renderBreadcrumb.bind(this);

        this.state = {
            username: getUserInfo()["UserNick"],
            modalVisible: false,
        }
    }

    /**
     * 下拉菜单栏
     */
    doHeadMenu(item) {
        if (item.key === "logout") {
            this.logout();
        } else if (item.key === "resetPassword") {
            this.showPassword();
        }
    };

    // 退出登录
    logout() {
        clearUserCookie();
        goToPath("/login");
    }

    // 显示重置密码
    showPassword() {
        this.setState({
            modalVisible: true
        });
    }

    // 重置密码
    resetPassword(originPassword, newPassword) {
        post("/users/resetPassword", {
            OriginPassword: originPassword,
            NewPassword: newPassword
        }, res => {
            if (res.code === 200) {
                let data = res.data;
                if (data["isSuccess"]) {
                    notificationInfo("修改成功");
                    this.logout();
                } else {
                    notificationInfo("修改失败，密码错误");
                }
            } else {
                notificationError("系统内部错误", JSON.stringify(res.data))
            }
        });
    }

    /**
     * 重置密码取消
     */
    handleCancel() {
        this.setState({modalVisible: false})
    }

    render() {
        return (
            <Header className="main_header">
                <div className="main_header_path">{this.renderBreadcrumb()}</div>
                <Menu mode="horizontal" className="main_header_mine" onClick={this.doHeadMenu}>
                    <SubMenu title={<div><Icon type="user"/>{this.state.username}</div>}>
                        <Menu.Item key="resetPassword">修改密码</Menu.Item>
                        <Menu.Item key="logout">退出登录</Menu.Item>
                    </SubMenu>
                </Menu>
                {this.renderPasswordModal()}
            </Header>
        );
    }

    /**
     * 密码对话框
     */
    renderPasswordModal() {
        let visible = this.state.modalVisible;
        return (<FormModal
            visible={visible}
            title={"修改密码内容"}
            handleSubmit={(values) => {
                this.resetPassword(hexMD5(values["originPassword"]), hexMD5(values["newPassword"]))
            }}
            handleCancel={this.handleCancel}
            renderFormItems={(getFieldDecorator) => {
                return [getFieldDecorator("originPassword", {
                    rules: [{required: true, message: "请输入原密码"}, checkRulePassword],
                })(
                    <Input type="password" placeholder="请输入原密码"/>
                ), getFieldDecorator("newPassword", {
                    rules: [{required: true, message: "请输入新密码"}, checkRulePassword],
                })(
                    <Input type="password" placeholder="请输入新密码"/>
                )];
            }}/>);
    }

    /**
     * 加载面包屑
     */
    renderBreadcrumb() {
        const urlBreadcrumbs = URL_BREADCRUB_MAP[getCurrentPath()];
        const breadcrumbItems = [];
        breadcrumbItems[0] = (
            <Breadcrumb.Item>
                <Link className="link" to="/main/yangPin/list">首页</Link>
            </Breadcrumb.Item>
        );
        for (let i = 0; i < urlBreadcrumbs.length; i++) {
            let urlBreadcrumb = urlBreadcrumbs[i];
            breadcrumbItems[i+1] = (
                <Breadcrumb.Item key={urlBreadcrumb.url}>
                    {urlBreadcrumb.url
                        ? <Link className="link" to={urlBreadcrumb.url}>{urlBreadcrumb.name}</Link>
                        : <span className="span">{urlBreadcrumb.name}</span>}
                </Breadcrumb.Item>
            );
        }
        return (
            <Breadcrumb>
                {breadcrumbItems}
            </Breadcrumb>
        );
    };

}

// 面包屑目录结构
const URL_BREADCRUB_MAP = {
    "/main/yangPin/list": [{name: "样品管理", url: null}, {name: "样品列表", url: "/main/yangPin/list"}],
    "/main/yangPin/add": [{name: "样品管理", url: null}, {name: "添加样品", url: "/main/yangPin/add"}],
    "/main/yangPin/detail": [{name: "样品管理", url: null}, {name: "样品列表", url: "/main/yangPin/list"}, {
        name: "样品详情",
        url: "/main/yangPin/detail"
    }],
    "/main/user/list": [{name: "职员管理", url: "/main/user/list"}],
    "/main/user/editor": [{name: "职员管理", url: "/main/user/list"}, {name: "职员编辑", url: "/main/user/editor"}],
    "/main/user/add": [{name: "职员管理", url: "/main/user/list"}, {name: "职员添加", url: "/main/user/add"}],
    "/main/doc/docOrder": [{name: "使用手册", url: null}, {name: "订单", url: "/main/doc/docOrder"}],
    "/main/doc/docUser": [{name: "使用手册", url: null}, {name: "用户", url: "/main/doc/docUser"}],
};

export default MainHeader;
