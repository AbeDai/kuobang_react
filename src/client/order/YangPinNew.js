import React from "react";
import "./YangPinNew.less";
import {post} from "../util/NetWorkUtil";
import {notificationError, notificationInfo} from "../util/NotificationUtil";
import {goToPath} from "../util/HistoryUtil";
import YangPinForm from "./YangPinForm";

export class YangPinNew extends React.Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        alert(JSON.stringify(values["BeiZhu"]));
        post("/yangPin/add", {
            BianHao: values["BianHao"],
            PinZhong: values["PinZhong"],
            ShaZhi: values["ShaZhi"],
            ChenFeng: values["ChenFeng"],
            KeZhong: values["KeZhong"],
            MenFu: values["MenFu"],
            JiaGe: values["JiaGe"],
            WeiZhi: values["WeiZhi"],
            BeiZhu: values["BeiZhu"] ? values["BeiZhu"] : "",
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