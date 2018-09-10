import React from "react"
import {getToken} from "./LoginUtil";
import {notificationError} from "./NotificationUtil";
import {goToPath} from "./HistoryUtil";

export function post(url, reqBody, callback) {
    fetch(`http://localhost:3000${url}`, {
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