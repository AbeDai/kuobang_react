import React from "react"
import {Form, Input, Button} from "antd"
import {goToPath} from "../util/HistoryUtil"
import "./Login.less";
import {notificationError} from "../util/NotificationUtil"
import {saveToken} from "../util/LoginUtil";
import {post} from "../util/NetWorkUtil";
import md5 from "md5-node";
import {checkRulePassword, checkRuleTel} from "../util/CheckRuleUtil";

class LoginPage extends React.Component {

    constructor() {
        super();

        this.doLogin = this.doLogin.bind(this);

        this.state = {
            telValidateStatus: "success",
            telHelpHint: "",
            passwordValidateStatus: "success",
            passwordHelpHint: "",
        };
    }

    doLogin(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                post("/users/login",
                    {UserTel: values.tel, UserPassword: md5(values.password)}, res => {
                        if (res.code === 200 && res.data.login) {
                            saveToken(res.data.token);
                            goToPath("/main/order");
                            notificationError("登录成功")
                        } else {
                            notificationError("密码错误", "当前手机号或者密码错误！")
                        }
                    });
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
                        <Form onSubmit={this.doLogin}>
                            <Form.Item>
                                {getFieldDecorator("tel", {
                                    rules: [{required: true, message: "请输入用户名"}, checkRuleTel],
                                })(
                                    <Input placeholder="请输入用户名"/>
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator("password", {
                                    rules: [{required: true, message: "请输入密码"}, checkRulePassword],
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
