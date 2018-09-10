import React from "react"
import "./Order.less";
import {Button, Icon, Input, InputNumber, Table} from 'antd';
import {post} from "../util/NetWorkUtil";
import {goToPath} from "../util/HistoryUtil";
import {notificationError} from "../util/NotificationUtil";

const {Column} = Table;

class Order extends React.Component {

    searchFilter = {};

    constructor() {
        super();

        this.requestUserList = this.requestUserList.bind(this);
        this.editYangPin = this.editYangPin.bind(this);
        this.tablePageChange = this.tablePageChange.bind(this);
        this.renderText = this.renderText.bind(this);
        this.renderSearchFilter = this.renderSearchFilter.bind(this);

        this.state = {
            data: [],
            pagination: {defaultPageSize: 10},
            loading: false,
            rangeFilter: {}
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
        const rangeFilter = this.state.rangeFilter;
        const searchFilter = this.searchFilter;
        this.setState({loading: true});
        post("/yangPin/list", {
            PageNum: pageNum,
            PageSize: 10,
            PinZhong: searchFilter["PinZhong"],
            ChenFeng: searchFilter["ChenFeng"],
            ShaZhiMin: rangeFilter["ShaZhi"] && rangeFilter["ShaZhi"]["min"] ? rangeFilter["ShaZhi"]["min"] : 0,
            ShaZhiMax: rangeFilter["ShaZhi"] && rangeFilter["ShaZhi"]["max"] ? rangeFilter["ShaZhi"]["max"] : Number.MAX_SAFE_INTEGER,
            KeZhongMin: rangeFilter["KeZhong"] && rangeFilter["KeZhong"]["min"] ? rangeFilter["KeZhong"]["min"] : 0,
            KeZhongMax: rangeFilter["KeZhong"] && rangeFilter["KeZhong"]["max"] ? rangeFilter["KeZhong"]["max"] : Number.MAX_SAFE_INTEGER,
            MenFuMin: rangeFilter["MenFu"] && rangeFilter["MenFu"]["min"] ? rangeFilter["MenFu"]["min"] : 0,
            MenFuMax: rangeFilter["MenFu"] && rangeFilter["MenFu"]["max"] ? rangeFilter["MenFu"]["max"] : Number.MAX_SAFE_INTEGER,
        }, res => {
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
                render={this.renderText}
                filterDropdown={({setSelectedKeys, selectedKeys, confirm}) => {
                    return this.renderSearchFilter("PinZhong", {setSelectedKeys, selectedKeys, confirm});
                }}
                filterIcon={() => <Icon type="filter" theme="outlined"/>}/>
            <Column
                title='成分'
                dataIndex='ChenFeng'
                key="ChenFeng"
                render={this.renderText}
                filterDropdown={({setSelectedKeys, selectedKeys, confirm}) => {
                    return this.renderSearchFilter("ChenFeng", {setSelectedKeys, selectedKeys, confirm});
                }}
                filterIcon={() => <Icon type="filter" theme="outlined"/>}/>
            <Column
                title='纱支（支）'
                dataIndex='ShaZhi'
                key="ShaZhi"
                render={this.renderText}
                filterDropdown={({setSelectedKeys, selectedKeys, confirm}) => {
                    return this.renderNumberFilter("ShaZhi", {setSelectedKeys, selectedKeys, confirm});
                }}
                filterIcon={() => <Icon type="filter" theme="outlined"/>}/>
            <Column
                title='克重（克）'
                dataIndex='KeZhong'
                key="KeZhong"
                render={this.renderText}
                filterDropdown={({setSelectedKeys, selectedKeys, confirm}) => {
                    return this.renderNumberFilter("KeZhong", {setSelectedKeys, selectedKeys, confirm});
                }}
                filterIcon={() => <Icon type="filter" theme="outlined"/>}/>
            <Column
                title='门幅（厘米）'
                dataIndex='MenFu'
                key="MenFu"
                render={this.renderText}
                filterDropdown={({setSelectedKeys, selectedKeys, confirm}) => {
                    return this.renderNumberFilter("MenFu", {setSelectedKeys, selectedKeys, confirm});
                }}
                filterIcon={() => <Icon type="filter" theme="outlined"/>}/>
            <Column
                title='位置'
                dataIndex='WeiZhi'
                key="WeiZhi"
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
     * 搜索过滤器
     */
    renderSearchFilter(key, {setSelectedKeys, selectedKeys, confirm}) {
        return (<div className="search-filter-dropdown">
            <Input
                className="search-filter-dropdown-input"
                placeholder="输入关键字"
                value={selectedKeys[0]}
                onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            />
            <Button
                className="search-filter-dropdown-button"
                type="primary" onClick={() => {
                confirm();
                this.searchFilter[key] = selectedKeys[0];
                this.requestUserList(0);
            }}>搜索</Button>
            <Button
                className="search-filter-dropdown-button"
                onClick={() => {
                confirm();
                this.searchFilter[key] = undefined;
                selectedKeys[0] = "";
                this.requestUserList(0);
            }}>重置</Button>
        </div>);
    }

    /**
     * 数字过滤器
     */
    renderNumberFilter(key, {setSelectedKeys, selectedKeys, confirm}) {
        const rangeFilter = this.state.rangeFilter;
        let range = rangeFilter[key];
        let minValue = range && range["min"] ? range["min"] : 0;
        let maxValue = range && range["max"] ? range["max"] : Number.MAX_SAFE_INTEGER;
        return (<div className="number-filter-dropdown">
            <InputNumber min={0} max={maxValue}
                         className="number-filter-dropdown-input"
                         value={selectedKeys[0]}
                         onChange={e => {
                             let value = e ? e : undefined;
                             selectedKeys[0] = value;
                             let rangeFilter = this.state.rangeFilter;
                             rangeFilter[key] = rangeFilter[key] || {};
                             rangeFilter[key]["min"] = value;
                             this.setState({rangeFilter: rangeFilter});
                         }}/>
            {" - "}
            <InputNumber min={minValue} max={Number.MAX_SAFE_INTEGER}
                         className="number-filter-dropdown-input"
                         value={selectedKeys[1]}
                         onChange={e => {
                             let value = e ? e : undefined;
                             selectedKeys[1] = value;
                             let rangeFilter = this.state.rangeFilter;
                             rangeFilter[key] = rangeFilter[key] || {};
                             rangeFilter[key]["max"] = value;
                             this.setState({rangeFilter: rangeFilter});
                         }}/>
            <Button type="primary"
                    className="number-filter-dropdown-button"
                    onClick={() => {
                        confirm();
                        this.requestUserList(0);
                    }}>过滤</Button>
            <Button
                className="number-filter-dropdown-button"
                onClick={() => {
                    confirm();
                    let rangeFilter = this.state.rangeFilter;
                    rangeFilter[key] = {};
                    setSelectedKeys([]);
                    this.setState({rangeFilter: rangeFilter});
                    this.requestUserList(0);
                }}>重置</Button>
        </div>);
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
