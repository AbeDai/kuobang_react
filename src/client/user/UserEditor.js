import React from "react";
import "./UserEditor.less";
import UserForm from "./UserForm";

export class UserEditor extends React.Component {

    constructor() {
        super();
        this.state = {
            user: {}
        };
    }

    componentDidMount() {
        if (this.props.location.state) {
            let user = this.props.location.state.user;
            this.setState({
                user: user
            });
        }
    }

    handleSubmit = (values) => {
        alert(JSON.stringify(values));
    };


    render() {
        let user = this.state.user;
        return (
            <UserForm handleSubmit={this.handleSubmit}
                      user={user}
                      passwordRequired={false}/>
        );
    }
}