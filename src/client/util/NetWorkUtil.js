import React from "react"
import {getToken} from "./LoginUtil";
import {notificationError} from "./NotificationUtil";
import {goToPath} from "./HistoryUtil";

/**
 * 普通post请求
 */
export function post(url, reqBody, callback) {
    fetch(`http://127.0.0.1:9100${url}`, {
        // fetch(`https://kuobang-bg.daiyibo.cn${url}`, {
        method: "post",
        headers: {
            "content-type": "application/json",
            "authorization": getToken()
        },
        body: JSON.stringify(reqBody)
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        if (data.code === 401) {
            goToPath("/login");
            notificationError("Token校验失败")
        }
        callback(data);
    });
}

/**
 * 上传图片post请求
 */
export function postFile(url, formData, callback) {
    fetch(`http://127.0.0.1:9100${url}`, {
    // fetch(`https://kuobang-bg.daiyibo.cn${url}`, {
        method:'post',
        headers: {
            "authorization": getToken()
        },
        body: formData
    }).then(async function (response) {
        let str = await response.text();
        let obj = {code: 400, data:"json解析出错"};
        if (str) {
            obj = JSON.parse(str);
        }
        return obj;
    }).then(function (data) {
        if (data.code === 401) {
            goToPath("/login");
            notificationError("Token校验失败")
        }
        callback(data);
    });
}