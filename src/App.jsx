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
                    handleMarkAsUnRead={this.handleMarkAsUnRead}
                    unreadCount={this.unreadCount()}
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

    handleSelectAll = () => {
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
        this.setState((prevState) => {
            const newMessages = prevState.messages.map(message => {
                if (message.selected) {
                    return {
                        ...message,
                        read: true,
                        selected: false
                    }
                } else {
                    return message
                }
            })
            return {
                ...prevState,
                messages: newMessages
            }
        })
    }

    handleMarkAsUnRead = () => {
        this.setState((prevState) => {
            const newMessages = prevState.messages.map(message => {
                if (message.selected) {
                    return {
                        ...message,
                        read: false,
                        selected: false
                    }
                } else {
                    return message
                }
            })
            return {
                ...prevState,
                messages: newMessages
            }
        })
    }

    unreadCount = () => {
        return this.state.messages.filter(message => message.read === false).length
    }
}

export default App;
