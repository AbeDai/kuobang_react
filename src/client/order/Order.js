import React from "react"
import "./Order.less";
import {Table} from 'antd';
import {post} from "../util/NetWorkUtil";
import {goToPath} from "../util/HistoryUtil";
import {notificationError} from "../util/NotificationUtil";

const {Column} = Table;

class Order extends React.Component {
    constructor() {
        super();

        this.requestUserList = this.requestUserList.bind(this);
        this.editYangPin = this.editYangPin.bind(this);
        this.tablePageChange = this.tablePageChange.bind(this);
        this.renderText = this.renderText.bind(this);

        this.state = {
            data: [],
            pagination: {defaultPageSize: 10},
            loading: false
        };
    }

    componentDidMount() {
        this.requestUserList(0);
    }

    /**
     * 切换页面
     */
    tablePageChange(pagination) {
        // 更新选中的页码
        const pager = this.state.pagination;
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        // 请求数据
        this.requestUserList(pager.current - 1);
    }

    /**
     * 请求用户列表
     */
    requestUserList(pageNum) {
        this.setState({loading: true});
        post("/yangPin/list", {PageNum: pageNum, PageSize: 10}, res => {
            if (res.code === 200 && res.data) {
                let data = res.data;
                let list = data.list;
                let pager = this.state.pagination;
                pager.total = data["total"];
                this.setState({data: list, pagination: pager, loading: false});
            } else {
                notificationError("请求出错，请稍后再试!");
                this.setState({loading: false});
            }
        });
    }

    /**
     * 编辑样品信息
     */
    editYangPin(index) {
        let data = {yangPinID: this.state.data[index]["YangPinID"]};
        let path = {
            pathname: '/main/yangPin/detail',
            state: data,
        };
        goToPath(path);
    }

    render() {
        return (<Table
            className="order-list-item"
            dataSource={this.state.data}
            pagination={this.state.pagination}
            loading={this.state.loading}
            onChange={this.tablePageChange}
            bordered>
            <Column
                title='编号'
                dataIndex='BianHao'
                key="BianHao"
                render={this.renderText}/>
            <Column
                title='品种'
                dataIndex='PinZhong'
                key="PinZhong"
                render={this.renderText}/>
            <Column
                title='纱织'
                dataIndex='ShaZhi'
                key="ShaZhi"
                render={this.renderText}/>
            <Column
                title='成分'
                dataIndex='ChenFeng'
                key="ChenFeng"
                render={this.renderText}/>
            <Column
                title='克重'
                dataIndex='KeZhong'
                key="KeZhong"
                render={this.renderText}/>
            <Column
                title='门幅'
                dataIndex='MenFu'
                key="MenFu"
                render={this.renderText}/>
            <Column
                title='价格'
                dataIndex='JiaGe'
                key="JiaGe"
                render={this.renderText}/>
            <Column
                title="操作"
                key="action"
                render={(text, record, index) => {
                    return {
                        children: <button className="order-edit-btn"
                                          onClick={() => this.editYangPin(index)}>详情</button>,
                        props: {},
                    };
                }}/>
        </Table>);
    }

    /**
     * 生成表单文字
     */
    renderText(text, row, index) {
        return {
            children: text,
            props: {},
        };
    }
}

export default Order;
