import React from "react";
import "./UserEditor.less";
import UserForm from "./UserForm";
import {post} from "../util/NetWorkUtil";
import {hexMD5} from "../util/MD5Util";
import {notificationError, notificationInfo} from "../util/NotificationUtil";
import {goToPath} from "../util/HistoryUtil";

export class UserEditor extends React.Component {

    constructor() {
        super();
        this.state = {
            user: {}
        };
    }

    componentDidMount() {
        if (this.props.location.state) {
            let user = this.props.location.state.user;
            this.setState({
                user: user
            });
        }
    }

    handleSubmit = (values) => {
        let password = values["password"];
        let finalPassword = password ? hexMD5(password) : "";
        post("/users/edit",
            {
                UserTel: values["tel"],
                UserPassword: finalPassword,
                UserNick: values["nickName"],
                UserState: values["state"],
                UserAuthority: values["authority"]
            }, res => {
                if (res.code === 200) {
                    goToPath("/main/user/list");
                    notificationInfo("修改成功");
                } else {
                    notificationError("参数错误", JSON.stringify(res.data));
                }
            });
    };

    render() {
        let user = this.state.user;
        return (
            <UserForm handleSubmit={this.handleSubmit}
                      user={user}
                      passwordRequired={false}
                      telDisabled={true}/>
        );
    }
}