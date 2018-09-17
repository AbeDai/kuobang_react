import React from "react"
import "./UserDoc.less";

class UserDoc extends React.Component {
    state = {
        collapsed: false
    };

    render() {
        return (
            <p>
                用户使用文档
            </p>
        );
    }
}

export default UserDoc;
