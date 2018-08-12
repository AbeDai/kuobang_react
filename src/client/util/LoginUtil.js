import React from "react"
import "./HistoryUtil"
import {goToPath} from "../util/HistoryUtil";
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

        componentWillMount() {
            this.checkAuth();
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth();
        }

        checkAuth() {

            // 判断登陆
            let user = Cookie.get("current-user");
            let login = this.checkLogin(user);

            // 已登录，登录页重定向到主页
            if (login) {
                goToPath("/main");
                return;
            }

            // 未登陆重定向到登陆页面
            if (!login) {
                goToPath("/login");
                return;
            }

            this.setState({login});
        }

        checkLogin(str){
            // todo 验证登录有效性
            console.log(str);
            return str;
        }

        render() {
            if (this.state.login) {
                return <Component {...this.props}/>
            }
            return ""
        }
    }

    Component.AuthenticatedComponent = AuthenticatedComponent;
    return Component.AuthenticatedComponent
}

export function doLogin(data){
    Cookie.set("current-user", data);
}

export function doLogout() {
    Cookie.remove("current-user");
}
