import React from "react"
import {Button, Form} from "antd"
import "./Main.less";
import {doLogout} from "../util/LoginUtil";
import {goToPath} from "../util/HistoryUtil";

class MainPage extends React.Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            doLogout();
            goToPath("/");
        });
    }

    render() {
        return (
            <div className="loginPageWrap1">
                <div className="box">
                    <p>我的主页</p>
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <Button type="primary" htmlType="submit" className="loginBtn">Logout</Button>
                </Form>
            </div>
        )
    }
}

let Main = Form.create()(MainPage);
export default Main;
