import {Button, Form, Modal} from 'antd';
import React from "react";
import "./FormModal.less";

class FormModalPage extends React.Component {

    constructor() {
        super();
        this.handleCancel = this.handleCancel.bind(this);
        this.renderFormItems = this.renderFormItems.bind(this);
    }

    // 提交操作
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.handleSubmit(values);
            }
        });
    };

    /**
     * 取消操作
     */
    handleCancel() {
        this.props.handleCancel();
    }

    render() {
        let {getFieldDecorator} = this.props.form;
        let title = this.props["title"];
        let visible = this.props["visible"];
        return (
            <Modal
                title={title}
                destroyOnClose={true}
                wrapClassName="vertical-center-modal"
                visible={visible}
                onCancel={this.handleCancel}
                footer={null}>
                <div className="form-div">
                    <Form
                        className="form"
                        onSubmit={this.handleSubmit}>
                        {this.renderFormItems(getFieldDecorator)}
                        <div>
                            <Button type="default" onClick={this.handleCancel} className="form-cancel">取消</Button>
                            <Button type="primary" htmlType="submit" className="form-submit">确认</Button>
                        </div>
                    </Form>
                </div>
            </Modal>
        );
    }

    /**
     * 请求表单元素
     */
    renderFormItems(getFieldDecorator) {
        let formItems = this.props.renderFormItems(getFieldDecorator);
        let finalFormItems = [];
        for (let i = 0; i < formItems.length; i++) {
            let item = formItems[i];
            finalFormItems[i] = (<Form.Item>
                {item}
            </Form.Item>);
        }
        return finalFormItems;
    }
}

let FormModal = Form.create()(FormModalPage);
export default FormModal;
