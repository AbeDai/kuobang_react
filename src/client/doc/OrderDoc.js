import React from "react"
import "./OrderDoc.less";

class OrderDoc extends React.Component {
    state = {
        collapsed: false
    };

    render() {
        return (
            <p>
                订单使用文档
            </p>
        );
    }
}

export default OrderDoc;
