import React from "react"
import {Form} from "antd"
import {goToPath} from "../util/HistoryUtil"
import "./Main.less";
import {notificationError} from "../util/NotificationUtil"

class MainPage extends React.Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (values.username === "123" && values.password === "123") {
                    // 表单的路由处理
                    goToPath("/index")
                } else {
                    notificationError("密码错误", "当前账户密码错误，忘记密码，请联系管理员！")
                }
            }
        });
    }

    render() {
        return (
            <div className="loginPageWrap1">
                <div className="box">
                    <p>我的主页</p>
                </div>
            </div>
        )
    }
}

let Main = Form.create()(MainPage);
export default Main;
