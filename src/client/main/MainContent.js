import React from "react"
import {Layout} from "antd";
import "./MainContent.less";
let {Content} = Layout;

class MainContent extends React.Component {

    render() {
        return (
            <Content className="main_content">
                <p>Bill is a cat.</p>
            </Content>
        );
    }
}

export default MainContent;
