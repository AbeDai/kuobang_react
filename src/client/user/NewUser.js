import React from "react";
import "./NewUser.less";
import UserForm from "./UserForm";
import {post} from "../util/NetWorkUtil";
import {hexMD5} from "../util/MD5Util";
import {notificationError, notificationInfo} from "../util/NotificationUtil";
import {goToPath} from "../util/HistoryUtil";

export class NewUser extends React.Component {

    constructor() {
        super();
    }

    componentDidMount() {

    }

    handleSubmit = (values) => {
        post("/users/register",
            {
                UserTel: values["tel"],
                UserPassword: hexMD5(values["password"]),
                UserNick: values["nickName"],
                UserState: values["state"],
                UserAuthority: values["authority"]
            }, res => {
                if (res.code === 200) {
                    goToPath("/main/user/list");
                    notificationInfo("修改成功")
                } else {
                    notificationError("参数错误", JSON.stringify(res.data))
                }
            });
    };

    render() {
        return (
            <UserForm handleSubmit={this.handleSubmit}
                      passwordRequired={true}
                      user={{}}
                      telDisabled={false}/>
        );
    }
}