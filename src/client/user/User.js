import React from "react"
import {Table} from 'antd';
import "./User.less";
import {post} from "../util/NetWorkUtil";
import {notificationError} from "../util/NotificationUtil";
import {goToPath} from "../util/HistoryUtil";
import {getUserInfo} from "../util/LoginUtil";

const {Column} = Table;

class User extends React.Component {

    constructor() {
        super();

        this.requestUserList = this.requestUserList.bind(this);
        this.editUser = this.editUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.isShowUserManager = this.isShowUserManager.bind(this);

        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        this.requestUserList();
    }

    /**
     * 编辑用户信息
     */
    editUser(index) {
        let data = {user: this.state.data[index]};
        let path = {
            pathname: '/main/user/editor',
            state: data,
        };
        goToPath(path);
    }

    /**
     * 新建用户信息
     */
    addUser() {
        goToPath('/main/user/add');
    }

    /**
     * 请求用户列表
     */
    requestUserList() {
        post("/users/list", {}, res => {
            if (res.code === 200 && res.data) {
                let data = this.isShowUserManager() ? res.data.concat([{}]) : res.data;
                this.setState({data: data});
            } else {
                notificationError("请求出错，请稍后再试!");
            }
        });
    }

    render() {
        const length = this.state.data.length;
        return (<Table
            className="user-list-item"
            dataSource={this.state.data}
            pagination={false}
            bordered>
            <Column
                title='昵称'
                dataIndex='UserNick'
                key="UserNick"
                render={(text, row, index) => {
                    const obj = {
                        children: text,
                        props: {},
                    };
                    if (this.isShowUserManager() && index === length - 1) {
                        obj.props.colSpan = 0;
                    }
                    return obj;
                }}/>
            <Column
                title='手机号'
                dataIndex='UserTel'
                key="UserTel"
                render={(text, row, index) => {
                    const obj = {
                        children: text,
                        props: {},
                    };
                    if (this.isShowUserManager() && index === length - 1) {
                        obj.props.colSpan = 0;
                    }
                    return obj;
                }}/>
            <Column
                title='用户状态'
                dataIndex='UserState'
                key="UserState"
                render={(text, row, index) => {
                    const obj = {
                        children: text === 0 ? "离职" : "在职",
                        props: {},
                    };
                    if (this.isShowUserManager() && index === length - 1) {
                        obj.props.colSpan = 0;
                    }
                    return obj;
                }}/>
            <Column
                title='用户权限'
                dataIndex='UserAuthority'
                key="UserAuthority"
                render={(text, row, index) => {
                    let authority;
                    if (text === 2) {
                        authority = "超级管理员";
                    }else if (text === 1) {
                        authority = "管理员";
                    }else {
                        authority = "普通用户";
                    }
                    const obj = {
                        children: authority,
                        props: {},
                    };
                    if (this.isShowUserManager() && index === length - 1) {
                        obj.props.colSpan = 0;
                    }
                    return obj;
                }}/>
            {this.isShowUserManager() && (<Column
                title="操作"
                key="action"
                render={(text, record, index) => {
                    let btn;
                    if (index === length - 1) {
                        btn = <button className="add-user-btn" onClick={this.addUser}>添加新用户</button>
                    } else {
                        btn = <button className="user-edit-btn" onClick={() => this.editUser(index)}>编辑</button>
                    }
                    const obj = {
                        children: btn,
                        props: {},
                    };
                    if (index === length - 1) {
                        obj.props.colSpan = 5;
                    }
                    return obj;
                }}/>)}
        </Table>);
    }

    // 是否应该显示管理页面
    isShowUserManager() {
        return getUserInfo()["UserAuthority"] === 2
    }

}

export default User;
