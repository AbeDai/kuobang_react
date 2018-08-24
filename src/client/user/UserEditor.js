import {Form, Input} from 'antd';
import React from "react";

class UserEditorPage extends React.Component {

    constructor() {
        super();
        this.state = {
            user: {}
        };
    }

    componentDidMount() {
        if (this.props.location.state) {
            let user = this.props.location.state.user;
            alert(JSON.stringify(user));
            this.setState({
                user: user
            });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        let {getFieldDecorator} = this.props.form;
        let user = this.state.user;
        /*
    labelCol={{
                            xs: {span: 24},
                            sm: {span: 8},
                        }}
                        wrapperCol={{
                            xs: {span: 24},
                            sm: {span: 16},
                        }}
         */
        return (
            <div>
                <Form
                    onSubmit={this.handleSubmit}>
                    <Form.Item
                        label={"昵称"}
                        colon={true}>
                        {getFieldDecorator("tel", {
                            rules: [{required: true, message: "请输入昵称"}],
                            initialValue: user.UserNick
                        })(
                            <Input placeholder="请输入昵称"/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label={"手机号"}
                        colon={true}>
                        {getFieldDecorator("tel", {
                            rules: [{required: true, message: "请输入手机号"}],
                            initialValue: user.UserTel
                        })(
                            <Input placeholder="请输入手机号"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("wechat", {
                            rules: [{required: true, message: "请输入微信号"}],
                            initialValue: user.WeChatId
                        })(
                            <Input placeholder="请输入微信号"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("state", {
                            rules: [{required: true, message: "请输入当前状态"}],
                            initialValue: user.UserState
                        })(
                            <Input placeholder="请输入当前状态"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("authority", {
                            rules: [{required: true, message: "请输入当前权限"}],
                            initialValue: user.UserAuthority
                        })(
                            <Input type="text" placeholder="请输入当前权限"/>
                        )}
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

let UserEditor = Form.create()(UserEditorPage);
export default UserEditor;
