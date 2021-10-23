import React, { Component } from 'react';
import { addTodo } from "../actions/todo.actions";
import { connect } from "react-redux";

class AddTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        };
    }

    onclick(e) {
        this.props.addTodo(12);
    }

    render() {
        return (
            <React.Fragment>
                <button type="submit" onClick={(e) => this.onclick(e)}>
                    Add Todo
                </button>
            </React.Fragment>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return ({
        addTodo: (text) => { dispatch(addTodo(text)) }
    })
}

function mapStateToProps(state) {
    const { todos } = state;
    return { todoList: todos }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);
