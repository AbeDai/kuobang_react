import {Icon, Modal, Upload} from 'antd';
import React from "react";
import "./ImageOperator.less";
import {notificationError} from "../util/NotificationUtil";
import {postFile, post} from "../util/NetWorkUtil";

class ImageOperator extends React.Component {

    constructor() {
        super();
        this.renderUploadButton = this.renderUploadButton.bind(this);
        this.renderPreViewModal = this.renderPreViewModal.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.previewImage = this.previewImage.bind(this);
        this.removeImage = this.removeImage.bind(this);
        this.getRealFileList = this.getRealFileList.bind(this);
        this.renderPreViewImages = this.renderPreViewImages.bind(this);

        this.state = {
            previewVisible: false,
            previewImage: "",
            uploadImages: [],
            deleteImageIds: [],
            isUploading: false
        }
    }

    // 上传图片
    uploadImage({onSuccess, onError, file}) {
        // 切换到上传操作
        this.setState({
            isUploading: true
        });
        // 上传图片
        const yangPinID = this.props["yangPinID"];
        let data = new FormData();
        data.append('ImageFile', file);
        data.append('YangPinID', yangPinID);
        postFile("/yangPin/addImage", data, res => {
            if (res.code === 200) {
                let data = res.data;
                const images = this.state.uploadImages;
                images.push({
                    uid: data["FileID"] + "",
                    status: "done",
                    url: data["FileUrl"]
                });
                this.setState({
                    uploadImages: images,
                    isUploading: false
                });
                onSuccess();
            } else {
                onError();
                notificationError("上传失败", JSON.stringify(res.data));
                this.setState({
                    isUploading: false
                });
            }
        });
    }

    // 预览图片
    previewImage(url) {
        this.setState({
            previewImage: url,
            previewVisible: true,
        });
    }

    // 删除图片
    removeImage(file) {
        const yangPinID = this.props["yangPinID"];
        const imageID = file["uid"];
        const that = this;
        return new Promise((resolve, reject) => {
            post("/yangPin/deleteImage",
                {
                    YangPinID: yangPinID,
                    ImageID: imageID,
                }, res => {
                    if (res.code === 200) {
                        // 移除对应图片
                        const imageIds = that.state.deleteImageIds;
                        imageIds.push(imageID);
                        that.setState({
                            deleteImageIds: imageIds
                        });
                        resolve(true);
                    } else {
                        reject();
                        notificationError("删除失败", JSON.stringify(res.data))
                    }
                });
        });
    }

    // 获取文件列表
    getRealFileList() {
        const fileList = this.props["fileList"].concat(this.state.uploadImages);
        const deleteImageIds = this.state.deleteImageIds;
        const finalList = fileList.concat();
        for (let i = 0; i < fileList.length; i++) {
            for (let j = 0; j < deleteImageIds.length; j++) {
                if (deleteImageIds[j] === fileList[i]["uid"]) {
                    finalList.splice(i, 1);
                    break;
                }
            }
        }
        return finalList;
    }

    render() {
        const isUploading = this.state.isUploading;
        const enable = this.props["enable"];
        if (enable) {
            return (
                <div>
                    <Upload
                        accept="image/*"
                        listType="picture-card"
                        disabled={isUploading}
                        fileList={this.getRealFileList()}
                        customRequest={this.uploadImage}
                        onPreview={(file) => this.previewImage(file.url)}
                        onRemove={this.removeImage}>
                        {this.renderUploadButton()}
                    </Upload>
                    {this.renderPreViewModal()}
                </div>
            );
        } else {
            return (
                <div>
                    {this.renderPreViewImages()}
                    {this.renderPreViewModal()}
                </div>
            );
        }
    }

    // 预览图片列表
    renderPreViewImages() {
        let images = this.getRealFileList();
        let previews = [];
        for (let i = 0; i < images.length; i++) {
            let image = images[i];
            let url = image["url"];
            previews[i] = (
                <div className="preview-img">
                    <div className="button"
                         onClick={() => this.previewImage(url)}>
                        <div className="div-eye">
                            <Icon className="icon-eye" style={{color: '#fff'}} type="eye" theme="outlined"/>
                        </div>
                    </div>
                    <img className="img" src={url}/>
                </div>
            );
        }
        return previews;
    }

    // 上传操作按钮
    renderUploadButton() {
        const fileList = this.getRealFileList();
        const enable = this.props["enable"];
        if (fileList.length >= 3 || !enable) {
            return null;
        } else if (this.state.isUploading) {
            return (
                <div>
                    <Icon type="loading"/>
                    <div>上传中</div>
                </div>
            );
        } else {
            return (
                <div>
                    <Icon type="plus"/>
                    <div>上传图片</div>
                </div>
            );
        }
    }

    // 预览图片
    renderPreViewModal() {
        const {previewVisible, previewImage} = this.state;
        return (
            <Modal
                maskClosable={true}
                wrapClassName="vertical-center-modal"
                visible={previewVisible}
                footer={null}
                onCancel={() => this.setState({previewVisible: false})}>
                <a className="a" href={previewImage} target="_blank">查看原图</a>
                <img className="img" style={{width: '100%', height: "100%"}} src={previewImage}/>
            </Modal>);
    }
}

export default ImageOperator;
