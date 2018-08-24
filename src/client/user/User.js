import React from "react"
import {Table} from 'antd';
import "./User.less";
import {post} from "../util/NetWorkUtil";
import {notificationError} from "../util/NotificationUtil";
import {goToPath} from "../util/HistoryUtil";
const {Column} = Table;

class User extends React.Component {

    constructor() {
        super();

        this.requestUserList = this.requestUserList.bind(this);
        this.editUser = this.editUser.bind(this);

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
     * 请求用户列表
     */
    requestUserList() {
        post("/users/list", {}, res => {
            if (res.code === 200 && res.data) {
                //TODO: 测试数据，多来几条
                let aaa = [];
                aaa = aaa.concat(res.data);
                aaa = aaa.concat(res.data);
                aaa = aaa.concat(res.data);
                aaa = aaa.concat(res.data);
                this.setState({data: aaa});
            } else {
                notificationError("请求出错，请稍后再试!");
            }
        });
    }

    render() {
        return <div>
            <Table
                className="user-list-item"
                dataSource={this.state.data}
                pagination={false}
                bordered>
                <Column
                    title='昵称'
                    dataIndex='UserNick'
                    key="UserNick"
                    render={(text) => {
                        return text
                    }}/>
                <Column
                    title='手机号'
                    dataIndex='UserTel'
                    key="UserTel"
                    render={(text) => {
                        return text
                    }}/>
                <Column
                    title='微信号'
                    dataIndex='WeChatId'
                    key="WeChatId"
                    render={(text) => {
                        return text
                    }}/>
                <Column
                    title='用户状态'
                    dataIndex='UserState'
                    key="UserState"
                    render={(text) => {
                        return text === 0 ? "离职" : "在职"
                    }}/>
                <Column
                    title='用户权限'
                    dataIndex='UserAuthority'
                    key="UserAuthority"
                    render={(text) => {
                        return text === 0 ? "普通用户" : "管理员"
                    }}/>
                <Column
                    title="操作"
                    key="action"
                    render={(text, record, index) => (
                        <button className="user-edit-btn" onClick={() => this.editUser(index)}>编辑</button>
                    )}/>
            </Table>
        </div>;
    }
}

export default User;
