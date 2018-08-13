import React from "react"
import {Form} from "antd"
import "./Main.less";
import {Layout} from "antd";
import MainSideBar from "./MainSideBar";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import MainContent from "./MainContent";
import {checkLogin} from "../util/LoginUtil";

class MainPage extends React.Component {
    state = {
        collapsed: false
    };

    render() {
        if (!checkLogin()) {
            return "";
        }
        return (
            <Layout>
                <MainSideBar/>
                <Layout className="main_layout_content">
                    <MainHeader/>
                    <MainContent/>
                    <MainFooter/>
                </Layout>
            </Layout>
        );
    }
}

let Main = Form.create()(MainPage);
export default Main;
