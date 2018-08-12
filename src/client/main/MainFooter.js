import React from "react"
import {Layout} from "antd";
import "./MainFooter.less";

let {Footer} = Layout;

class MainFooter extends React.Component {

    render() {
        return (
            <Footer className="main_footer">
                阔邦 ©2018 Created by 戴益波
            </Footer>
        );
    }
}

export default MainFooter;
