import React from "react"
import {List, Avatar, Spin} from 'antd';
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import VList from 'react-virtualized/dist/commonjs/List';
import "./User.less";
import {post} from "../util/NetWorkUtil";
import {notificationError} from "../util/NotificationUtil";

class User extends React.Component {

    constructor() {
        super();

        this.renderItem = this.renderItem.bind(this);
        this.requestUserList = this.requestUserList.bind(this);

        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        this.requestUserList();
    }

    /**
     * 请求用户列表
     */
    requestUserList(){
        post("/users/list", {}, res => {
            if (res.code === 200 && res.data) {
                this.setState({data: res.data});
            } else {
                notificationError("请求出错，请稍后再试!");
            }
        });
    }

    /**
     * 加载表单
     */
    renderItem({index, key, style}) {
        let itemView;
        if (index === 0) {
            // 表头
            itemView =
                <List.Item key={key} style={style}>
                    <div>Content</div>
                </List.Item>;
        } else {
            // 表单内容
            const item = this.state.data[index - 1];
            itemView =
                <List.Item key={key} style={style}>
                    <List.Item.Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                        title={<a href="https://ant.design">{item["UserNick"]}</a>}
                        description={item["UserTel"]}
                    />
                    <div>Content</div>
                </List.Item>;
        }
        return itemView;
    };

    render() {
        return (
            <List>
                {this.state.data.length > 0 && <WindowScroller>
                    {({height, isScrolling, onChildScroll, scrollTop}) => (
                        <AutoSizer disableHeight>
                            {({width}) => (
                                <VList
                                    autoHeight
                                    height={height}
                                    isScrolling={isScrolling}
                                    onScroll={onChildScroll}
                                    overscanRowCount={2}
                                    rowCount={this.state.data.length}
                                    rowHeight={73}
                                    rowRenderer={this.renderItem}
                                    scrollTop={scrollTop}
                                    width={width}/>
                            )}
                        </AutoSizer>
                    )}
                </WindowScroller>}
            </List>
        );
    }
}

export default User;
