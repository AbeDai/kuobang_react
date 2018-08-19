import React from "react"
import {notificationError} from "./NotificationUtil";

export function post(url, reqBody, callback) {
    fetch(`http://localhost:3000${url}`, {
        method: "post",
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify(reqBody)
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        callback(data);
    });
}
