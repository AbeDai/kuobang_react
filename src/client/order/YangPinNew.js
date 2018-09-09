import React from "react";
import "./YangPinNew.less";
import {post} from "../util/NetWorkUtil";
import {hexMD5} from "../util/MD5Util";
import {notificationError, notificationInfo} from "../util/NotificationUtil";
import {goToPath} from "../util/HistoryUtil";
import YangPinForm from "./YangPinForm";

export class YangPinNew extends React.Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        post("/yangPin/add", {
            BianHao: values["BianHao"],
            PinZhong: values["PinZhong"],
            ShaZhi: values["ShaZhi"],
            ChenFeng: values["ChenFeng"],
            KeZhong: values["KeZhong"],
            MenFu: values["MenFu"],
            JiaGe: values["JiaGe"],
        }, res => {
            if (res.code === 200) {
                goToPath("/main/yangPin/list");
                notificationInfo("添加成功")
            } else {
                notificationError("参数错误", JSON.stringify(res.data))
            }
        });
    };

    render() {
        return (
            <YangPinForm handleSubmit={this.handleSubmit}
                         yangPin={{}}/>
        );
    }
}