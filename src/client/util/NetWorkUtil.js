import React from "react"
import {getToken} from "./LoginUtil";

export function post(url, reqBody, callback) {
    fetch(`http://localhost:3000${url}`, {
        method: "post",
        headers:{
            "content-type": "application/json",
            "authorization": getToken()
        },
        body: JSON.stringify(reqBody)
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        callback(data);
    });
}
