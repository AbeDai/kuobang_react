import {Button, Form, Input} from 'antd';
import React from "react";
import "./YangPinForm.less";
import {
    checkRuleBianHao,
    checkRuleChenFeng,
    checkRuleJiaGe,
    checkRuleKeZhong,
    checkRuleMenFu,
    checkRulePinZhong,
    checkRuleShaZhi
} from "../util/CheckRuleUtil";

class YangPinFormPage extends React.Component {


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
        let yangPin = this.props["yangPin"];
        return (
            <div className="yangpin-editor-form-div">
                <Form
                    AUTOCOMPLETE="OFF"
                    className="yangpin-editor-form"
                    onSubmit={this.handleSubmit}>
                    <Form.Item
                        labelCol={{span: 7}}
                        wrapperCol={{span: 12}}
                        label={"编号"}>
                        {getFieldDecorator("BianHao", {
                            rules: [{required: true, message: "请输入样品编号"}, checkRuleBianHao],
                            initialValue: yangPin["BianHao"]
                        })(
                            <Input placeholder="请输入样品编号"/>
                        )}
                    </Form.Item>
                    <Form.Item
                        labelCol={{span: 7}}
                        wrapperCol={{span: 12}}
                        label={"品种"}>
                        {getFieldDecorator("PinZhong", {
                            rules: [{required: true, message: "请输入样品品种"}, checkRulePinZhong],
                            initialValue: yangPin["PinZhong"]
                        })(
                            <Input placeholder="请输入样品品种"/>
                        )}
                    </Form.Item>
                    <Form.Item
                        labelCol={{span: 7}}
                        wrapperCol={{span: 12}}
                        label={"成分"}>
                        {getFieldDecorator("ChenFeng", {
                            rules: [{required: true, message: "请输入样品成分"}, checkRuleChenFeng],
                            initialValue: yangPin["ChenFeng"]
                        })(
                            <Input placeholder="请输入样品成分"/>
                        )}
                    </Form.Item>
                    <Form.Item
                        labelCol={{span: 7}}
                        wrapperCol={{span: 12}}
                        label={"纱支（支）"}>
                        {getFieldDecorator("ShaZhi", {
                            rules: [{required: true, message: "请输入样品纱支"}, checkRuleShaZhi],
                            initialValue: yangPin["ShaZhi"]
                        })(
                            <Input placeholder="请输入样品纱支"/>
                        )}
                    </Form.Item>
                    <Form.Item
                        labelCol={{span: 7}}
                        wrapperCol={{span: 12}}
                        label={"克重（克）"}>
                        {getFieldDecorator("KeZhong", {
                            rules: [{required: true, message: "请输入样品克重"}, checkRuleKeZhong],
                            initialValue: yangPin["KeZhong"]
                        })(
                            <Input placeholder="请输入样品克重"/>
                        )}
                    </Form.Item>
                    <Form.Item
                        labelCol={{span: 7}}
                        wrapperCol={{span: 12}}
                        label={"门幅（厘米）"}>
                        {getFieldDecorator("MenFu", {
                            rules: [{required: true, message: "请输入样品门幅"}, checkRuleMenFu],
                            initialValue: yangPin["MenFu"]
                        })(
                            <Input placeholder="请输入样品门幅"/>
                        )}
                    </Form.Item>
                    <Form.Item
                        labelCol={{span: 7}}
                        wrapperCol={{span: 12}}
                        label={"价格（元/米）"}>
                        {getFieldDecorator("JiaGe", {
                            rules: [{required: true, message: "请输入样品价格"}, checkRuleJiaGe],
                            initialValue: yangPin["JiaGe"]
                        })(
                            <Input placeholder="请输入样品价格"/>
                        )}
                    </Form.Item>
                    <Button type="primary" htmlType="submit" className="yangpin-editor-form-submit">确认</Button>
                </Form>
            </div>
        );
    }
}

let YangPinForm = Form.create()(YangPinFormPage);
export default YangPinForm;
