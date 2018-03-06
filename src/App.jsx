import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Toolbar from "./Toolbar";
import Messages from "./Messages";


class App extends Component {
    constructor(props) {
        super(props)
        const data = require("./data.json");

        this.state = {
            messages: data,
            selectAll: false
        }
        this.handleCheckbox = this.handleCheckbox.bind(this)
    }

    render() {
        console.log('state ', this.state.messages)
        return (
            <div className="App">
                <Toolbar
                    handleSelectAll={this.handleSelectAll}
                    selectAll={this.state.selectAll}
                    handleMarkAsRead={this.handleMarkAsRead}
                />
                <Messages
                    messages={this.state.messages}
                    handleCheckbox={this.handleCheckbox}
                    handleStar={this.handleStar}
                />
            </div>
        );
    }

    handleCheckbox = (e) => {
        const id = e.target.id
        this.setState((prevState) => {
            const newMessages = prevState.messages.map(message => {
                if (message.id === Number(id)) {
                    return {
                        ...message,
                        selected: !message.selected
                    }
                }
                else {
                    return message
                }
            })
            return {
                ...prevState,
                messages: newMessages
            }
        })
    }

    handleStar = (e) => {
        const id = e.target.id
        this.setState((prevState) => {
            const newMessages = prevState.messages.map(message => {
                if (message.id === Number(id)) {
                    return {
                        ...message,
                        starred: !message.starred
                    }
                }
                else {
                    return message
                }
            })
            return {
                ...prevState,
                messages: newMessages
            }
        })
    }

    handleSelectAll = (e) => {
        this.setState((prevState) => {
            const selectAll = !prevState.selectAll
            if (selectAll) {
                return {
                    ...prevState,
                    selectAll: selectAll,
                    messages: prevState.messages.map(message => {
                        return {
                            ...message,
                            selected: true
                        }
                    })
                }
            } else {
                return {
                    ...prevState,
                    selectAll: selectAll,
                    messages: prevState.messages.map(message => {
                        return {
                            ...message,
                            selected: false
                        }
                    })

                }
            }
        })
    }

    handleMarkAsRead = () => {
        console.log('handle mark read', this.state.markRead)
        this.setState((prevState) => ({
            ...prevState,
            markRead: !prevState.markRead
        }))
    }
}

export default App;
