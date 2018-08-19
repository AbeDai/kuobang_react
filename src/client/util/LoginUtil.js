import React from "react"
import "./HistoryUtil"
import {goToPath, getCurrentPath} from "../util/HistoryUtil";
import {Cookies} from "react-cookie";

const Cookie = new Cookies();

export function requireAuthentication(Component) {
    // 组件有已登陆的模块 直接返回 (防止从新渲染)
    if (Component.AuthenticatedComponent) {
        return Component.AuthenticatedComponent
    }

    // 创建验证组件
    class AuthenticatedComponent extends React.Component {

        state = {
            login: true,
        };

        componentWillReceiveProps(nextProps) {
            this.checkAuth();
        }

        checkAuth() {
            // 判断登陆
            let login = checkLogin();

            // 未登陆重定向到登陆页面
            if (!login) {
                goToPath("/login");
                return;
            }

            this.setState({login});
        }

        render() {
            if (this.state.login) {
                return <Component {...this.props}/>
            }
            return ""
        }
    }

    Component.AuthenticatedComponent = AuthenticatedComponent;
    return Component.AuthenticatedComponent;
}

export function checkLogin(){
    return Cookie.get("token");
}

export function saveToken(token){
    Cookie.set("token", token);
}

export function getToken() {
    Cookie.get("token");
}

export function clearUserCookie() {
    Cookie.remove("token");
    Cookie.remove("user_info");
}

export function saveUserInfo(userinfo){
    Cookie.set("user_info", JSON.stringify(userinfo));
}

export function getUserInfo(){
    return Cookie.get("user_info");
}