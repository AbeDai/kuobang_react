import React from "react"
import {Form, Input, Button} from "antd"
import {goToPath} from "../util/HistoryUtil"
import "./Login.less";
import {notificationError} from "../util/NotificationUtil"
import {doLogin} from "../util/LoginUtil";

class LoginPage extends React.Component {

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
                    doLogin(JSON.stringify(values))
                    goToPath("/main/order")
                } else {
                    notificationError("密码错误", "当前账户密码错误，忘记密码，请联系管理员！")
                }
            }
        });
    }

    render() {
        let {getFieldDecorator} = this.props.form;
        return (
            <div className="loginPageWrap">
                <div className="box">
                    <p>阔邦管理系统</p>
                    <div className="loginWrap">
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Item>
                                {getFieldDecorator("username", {
                                    rules: [{required: true, message: "请输入用户名"}],
                                })(
                                    <Input placeholder="请输入用户名"/>
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator("password", {
                                    rules: [{required: true, message: "请输入密码"}],
                                })(
                                    <Input type="password" placeholder="请输入密码"/>
                                )}
                            </Form.Item>
                            <Button type="primary" htmlType="submit" className="loginBtn">Login</Button>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

let Login = Form.create()(LoginPage);
export default Login;
