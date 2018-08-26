import {Form, Input, Button, Radio} from 'antd';
import React from "react";
import "./UserForm.less";
import {checkRuleNickName, checkRulePasswordWithEmpty} from "../util/CheckRuleUtil";
import {checkRuleTel} from "../util/CheckRuleUtil";
import {checkRulePassword} from "../util/CheckRuleUtil";
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class UserFormPage extends React.Component {


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.handleSubmit(values);
            }
        });
    };

    render() {
        let {getFieldDecorator} = this.props.form;
        let requiredPassword = this.props["passwordRequired"];
        let user = this.props.user;
        return (
            <div className="user-editor-form-div">
                <Form
                    className="user-editor-form"
                    onSubmit={this.handleSubmit}>
                    <Form.Item
                        labelCol={{span: 7}}
                        wrapperCol={{span: 12}}
                        label={"昵称"}>
                        {getFieldDecorator("nickName", {
                            rules: [{required: true, message: "请输入昵称"}, checkRuleNickName],
                            initialValue: user["UserNick"]
                        })(
                            <Input placeholder="请输入昵称"/>
                        )}
                    </Form.Item>
                    <Form.Item
                        labelCol={{span: 7}}
                        wrapperCol={{span: 12}}
                        label={"手机号"}>
                        {getFieldDecorator("tel", {
                            rules: [{required: true, message: "请输入手机号"}, checkRuleTel],
                            initialValue: user["UserTel"]
                        })(
                            <Input placeholder="请输入手机号"/>
                        )}
                    </Form.Item>
                    <Form.Item
                        labelCol={{span: 7}}
                        wrapperCol={{span: 12}}
                        label={"密码"}>
                        {getFieldDecorator("password", {
                            rules: [{required: requiredPassword, message:"请输入密码"}, requiredPassword ? checkRulePassword : checkRulePasswordWithEmpty],
                        })(
                            <Input type="text" placeholder="请输入密码"/>
                        )}
                    </Form.Item>
                    <Form.Item
                        labelCol={{span: 7}}
                        wrapperCol={{span: 12}}
                        label={"状态"}>
                        {getFieldDecorator("state", {
                            initialValue: user["UserState"] ? user["UserState"] : 1
                        })(
                            <RadioGroup onChange={(e)=>{console.log('radio checked:' + e.target.value);}}>
                                <RadioButton value={1}>在职</RadioButton>
                                <RadioButton value={0}>离职</RadioButton>
                            </RadioGroup>
                        )}
                    </Form.Item>
                    <Form.Item
                        labelCol={{span: 7}}
                        wrapperCol={{span: 12}}
                        label={"权限"}>
                        {getFieldDecorator("authority", {
                            initialValue: user["UserAuthority"] ? user["UserAuthority"] : 0
                        })(
                            <RadioGroup onChange={(e)=>{console.log('radio checked:' + e.target.value);}}>
                                <RadioButton value={0}>普通用户</RadioButton>
                                <RadioButton value={1}>管理员</RadioButton>
                            </RadioGroup>
                        )}
                    </Form.Item>
                    <Button type="primary" htmlType="submit" className="user-editor-form-submit">确认</Button>
                </Form>
            </div>
        );
    }
}

let UserForm = Form.create()(UserFormPage);
export default UserForm;
