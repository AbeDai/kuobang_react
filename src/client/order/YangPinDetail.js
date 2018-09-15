import React from "react";
import "./YangPinDetail.less";
import {Upload, Icon, Input, Modal, Table, Tooltip} from 'antd';
import {
    checkRuleBeiZhu,
    checkRuleChenFeng,
    checkRuleJiaGe,
    checkRuleKeZhong,
    checkRuleMenFu,
    checkRulePinZhong,
    checkRuleShaZhi, checkRuleWeiZhi
} from "../util/CheckRuleUtil";
import FormModal from "../common/FormModal";
import {notificationError, notificationInfo} from "../util/NotificationUtil";
import {post, postFile} from "../util/NetWorkUtil";
import {getUserInfo} from "../util/LoginUtil";
import {goToPath} from "../util/HistoryUtil";
import ImageOperator from "../common/ImageOperator";

const {Column} = Table;
const {TextArea} = Input;
const confirm = Modal.confirm;

export class YangPinDetail extends React.Component {

    yangPin = {};

    constructor() {
        super();
        this.rendContent = this.rendContent.bind(this);
        this.editItem = this.editItem.bind(this);
        this.renderEditModal = this.renderEditModal.bind(this);
        this.requestYangPinDetail = this.requestYangPinDetail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.canEdit = this.canEdit.bind(this);
        this.canDelete = this.canDelete.bind(this);
        this.deleteYangPin = this.deleteYangPin.bind(this);
        this.renderImageUpload = this.renderImageUpload.bind(this);

        this.state = {
            detailContent: [],
            editIndex: -1,
            yangPinId: "",
            imageList: [],
        };
    }

    componentDidMount() {
        if (this.props.location.state) {
            let yangPinId = this.props.location.state.yangPinID;
            this.requestYangPinDetail(yangPinId);
        }
    }

    /**
     * 请求样品详情
     */
    requestYangPinDetail(yangPinId) {
        post("/yangPin/detail", {
            YangPinID: yangPinId,
        }, res => {
            if (res.code === 200) {
                this.yangPin = res.data;
                // 表单内容
                let detailContent = [];
                let detailKeys = Object.keys(DetailDesc);
                for (let i = 0; i < detailKeys.length; i++) {
                    let key = detailKeys[i];
                    detailContent[i] = {desc: DetailDesc[key], content: this.yangPin[key]}
                }
                // 图片内容
                let imageList = [];
                let images = this.yangPin["Images"];
                for (let j = 0; j < images.length; j++)  {
                    let image = images[j];
                    imageList[j] = {
                        uid: image["FileID"],
                        status: 'done',
                        url: image["FileUrl"],
                    };
                }
                this.setState({
                    yangPinId: yangPinId,
                    detailContent: detailContent,
                    imageList: imageList
                });
            } else {
                notificationError("参数错误", JSON.stringify(res.data))
            }
        });
    }

    /**
     * 编辑详情
     */
    editItem(index) {
        this.setState({
            editIndex: index,
            modalVisible: true
        });
    }

    /**
     * 处理表单更新
     */
    handleSubmit(key, value) {
        const yangPin = this.yangPin;
        this.setState({modalVisible: false});
        let update = {
            YangPinID: yangPin["YangPinID"],
            BianHao: yangPin["BianHao"],
            PinZhong: yangPin["PinZhong"],
            ShaZhi: yangPin["ShaZhi"],
            ChenFeng: yangPin["ChenFeng"],
            KeZhong: yangPin["KeZhong"],
            MenFu: yangPin["MenFu"],
            WeiZhi: yangPin["WeiZhi"],
            JiaGe: yangPin["JiaGe"],
            BeiZhu: yangPin["BeiZhu"] ? yangPin["BeiZhu"] : "",
        };
        update[key] = value;
        post("/yangPin/edit", update, res => {
            if (res.code === 200) {
                this.requestYangPinDetail(yangPin["YangPinID"]);
                notificationInfo("修改成功")
            } else {
                notificationError("参数错误", JSON.stringify(res.data))
            }
        });
    }

    /**
     * 处理表单更新取消
     */
    handleCancel() {
        this.setState({modalVisible: false})
    }

    /**
     * 删除当前样品
     */
    deleteYangPin() {
        const yangPinID = this.yangPin["YangPinID"];
        confirm({
            content: "确定删除该样品吗？",
            okText: "确定",
            okType: "danger",
            cancelText: "取消",
            onOk() {
                post("/yangPin/delete", {
                    YangPinID: yangPinID,
                }, res => {
                    if (res.code === 200) {
                        notificationInfo("删除成功");
                        goToPath("/main/yangPin/list");
                    } else {
                        notificationError("参数错误", JSON.stringify(res.data))
                    }
                });
            },
        });
    }

    render() {
        const detail = this.state.detailContent;
        return (
            <div className="yangPin-content">
                <div className="detail">
                    <Table
                        showHeader={false}
                        className="item"
                        dataSource={detail}
                        pagination={false}>
                        <Column
                            dataIndex='desc'
                            key="desc"
                            render={(text, row, index) => {
                                return {
                                    children: text,
                                    props: {width: 130},
                                };
                            }}/>
                        <Column
                            dataIndex='content'
                            key="content"
                            render={(text, row, index) => {
                                return this.rendContent(index, text);
                            }}/>
                    </Table>
                </div>
                {this.renderImageUpload()}
                {this.renderEditModal()}
            </div>
        )
    }

    // 上传图片
    renderImageUpload() {
        const yangPinId = this.state.yangPinId;
        const imageList = this.state.imageList;
        const enable = this.canEdit();
        return (
            <div className="image-upload">
                <ImageOperator
                    yangPinID={yangPinId}
                    fileList={imageList}
                    enable={enable}/>
            </div>);
    }

    /**
     * 获取内容编辑
     */
    rendContent(index, text) {
        if (index === 0 && this.canDelete()) {
            return (
                <div>
                    {text}
                    <Tooltip title="删除样品">
                        <button className="edit-btn"
                                onClick={() => this.deleteYangPin()}>
                            <Icon type="delete" theme="outlined"/>
                        </button>
                    </Tooltip>
                </div>);
        } else if (index > 1 && this.canEdit()) {
            return (
                <div>
                    <span className="enable-return">{text}</span>
                    <Tooltip title="编辑内容">
                        <button className="edit-btn"
                                onClick={() => this.editItem(index)}>
                            <Icon type="edit" theme="outlined"/>
                        </button>
                    </Tooltip>
                </div>);
        } else {
            return text;
        }
    }

    /**
     * 加载对话框
     */
    renderEditModal() {
        let index = this.state.editIndex;
        let detailItem = this.state.detailContent[index];
        let visible = this.state.modalVisible;
        let key = Object.keys(DetailDesc)[index];
        let pleaseHolder = DetailPleaseHolder[key];
        let check = DetailCheck[key];
        return (<FormModal
            visible={visible}
            title={detailItem ? `修改${detailItem.desc}内容` : ""}
            handleSubmit={(values) => {
                this.handleSubmit(key, values["item"])
            }}
            handleCancel={this.handleCancel}
            renderFormItems={(getFieldDecorator) => {
                return [getFieldDecorator("item", {
                    rules: [{required: key !== "BeiZhu", message: pleaseHolder}, check],
                    initialValue: detailItem ? detailItem.content : ""
                })(
                    key === "BeiZhu"
                        ? <TextArea placeholder={pleaseHolder} autosize={{minRows: 2, maxRows: 5}}/>
                        : <Input placeholder={pleaseHolder}/>
                )];
            }}/>);
    }

    // 是否可以编辑样品
    canEdit() {
        return getUserInfo()["UserAuthority"] === 2
            || getUserInfo()["UserAuthority"] === 1
            || getUserInfo()["UserId"] === this.yangPin["UserId"];
    }

    // 是否可以删除样品
    canDelete() {
        return getUserInfo()["UserAuthority"] === 2
            || getUserInfo()["UserAuthority"] === 1;
    }
}

// 表头元素
const DetailDesc = {
    BianHao: "编号",
    UserNick: "负责人",
    PinZhong: "品种",
    ChenFeng: "成分",
    ShaZhi: "纱支（支）",
    KeZhong: "克重（克）",
    MenFu: "门幅（厘米）",
    WeiZhi: "位置",
    JiaGe: "价格（元/米）",
    BeiZhu: "备注",
};

// 提示语
const DetailPleaseHolder = {
    PinZhong: "请输入样品品种",
    ChenFeng: "请输入样品成分",
    ShaZhi: "请输入样品纱支",
    KeZhong: "请输入样品克重",
    MenFu: "请输入样品门幅",
    WeiZhi: "请输入样品位置",
    JiaGe: "请输入样品价格",
    BeiZhu: "请输入样品备注",
};

// 验证条件
const DetailCheck = {
    PinZhong: checkRulePinZhong,
    ChenFeng: checkRuleChenFeng,
    ShaZhi: checkRuleShaZhi,
    KeZhong: checkRuleKeZhong,
    MenFu: checkRuleMenFu,
    WeiZhi: checkRuleWeiZhi,
    JiaGe: checkRuleJiaGe,
    BeiZhu: checkRuleBeiZhu,
};