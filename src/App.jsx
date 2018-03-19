import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Toolbar from "./Toolbar";
import Messages from "./Messages";
import {ComposeForm} from "./ComposeForm";


class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            messages: [],
            openComposeForm: false
        }
    }

    async componentWillMount() {
        const env = process.env
        const response = await fetch(`${env.REACT_APP_API_URL}/api/messages`)
        const json = await response.json()
        this.setState({messages: json._embedded.messages})
    }

    render() {
        const selection = this.fetchSelectAll()
        return (
            <div className="container">
                <Toolbar
                    readOnly={this.readOnly()}
                    handleSelectAll={this.handleSelectAll}
                    selectAll={selection}
                    handleMarkAsRead={this.handleMarkAsRead}
                    handleMarkAsUnRead={this.handleMarkAsUnRead}
                    handleDeleteMessages={this.handleDeleteMessages}
                    handleAddLabel={this.handleAddLabel}
                    handleRemoveLabel={this.handleRemoveLabel}
                    unreadCount={this.unreadCount()}
                    renderForm={this.renderForm}

                />
                <ComposeForm
                    openComposeForm={this.state.openComposeForm}
                    postMessage={this.postMessage}
                    renderForm={this.renderForm}
                />
                <Messages
                    messages={this.state.messages}
                    handleCheckbox={this.handleCheckbox}
                    handleStar={this.handleStar}
                />
            </div>
        );
    }

    renderForm = () => {
        this.setState((prevState) => {
            return {
                ...prevState,
                openComposeForm: !prevState.openComposeForm
            }
        })
    }

    readOnly = () => {
        return this.state.messages
            .filter(message => message.selected).length === 0
    }

    fetchSelectAll = () => {
        const selectedMessages = this.state.messages
            .filter(message => message.selected)

        if (selectedMessages.length === 0) {
            return 'none'
        }
        else if (selectedMessages.length === this.state.messages.length) {
            return 'all'
        }
        else {
            return 'some'
        }
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

    handleStar = async (e) => {
        const env = process.env

        const id = e.target.id
        let currentMessage
        const newMessages = this.state.messages.map(message => {
            if (message.id === Number(id)) {
                currentMessage = {
                    ...message,
                    starred: !message.starred
                }
                return currentMessage
            }
            else {
                return message
            }
        })

        this.patchMessages({
            "messageIds": [currentMessage.id],
            "command": "star",
            "star": currentMessage.starred
        })
    }


    handleSelectAll = () => {
        const selectAll = this.fetchSelectAll()
        this.setState((prevState) => {
            if (selectAll !== 'all') {
                return {
                    ...prevState,
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

    fetchSelectedMessageIds = () => {
        return this.state.messages.filter(message => message.selected).map(message => message.id)
    }

    handleMarkAsRead = async () => {
        this.patchMessages({
            "messageIds": this.fetchSelectedMessageIds(),
            "command": "read",
            "read": true
        })

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
        this.patchMessages({
            "messageIds": this.fetchSelectedMessageIds(),
            "command": "read",
            "read": false
        })
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

    handleDeleteMessages = () => {
        this.patchMessages({
            "messageIds": this.fetchSelectedMessageIds(),
            "command": "delete"
        })

    }

    handleAddLabel = (e) => {
        const selectedValue = e.target.value

        this.patchMessages({
            "messageIds": this.fetchSelectedMessageIds(),
            "command": "addLabel",
            "label": selectedValue
        })
    }

    handleRemoveLabel = (e) => {
        const selectedValue = e.target.value
        this.patchMessages({
            "messageIds": this.fetchSelectedMessageIds(),
            "command": "removeLabel",
            "label": selectedValue
        })
    }

    patchMessages = async (payload) => {
        const env = process.env

        await fetch(`${env.REACT_APP_API_URL}/api/messages`, {
            method: 'PATCH',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        const response = await fetch(`${env.REACT_APP_API_URL}/api/messages`)
        const json = await response.json()
        this.setState({messages: json._embedded.messages})
    }


    postMessage = async (subject, body) => {
        const env = process.env

        await fetch(`${env.REACT_APP_API_URL}/api/messages`, {
            method: 'POST',
            body: JSON.stringify({
                subject,
                body
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        const response = await fetch(`${env.REACT_APP_API_URL}/api/messages`)
        const json = await response.json()
        this.setState({messages: json._embedded.messages})
    }
}

export default App;
