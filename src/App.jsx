import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Toolbar from "./Toolbar";
import Messages from "./Messages";


class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            messages: []
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
            <div className="App">
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
                />
                <Messages
                    messages={this.state.messages}
                    handleCheckbox={this.handleCheckbox}
                    handleStar={this.handleStar}
                />
            </div>
        );
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

        this.setState((prevState) => {
            return {
                ...prevState,
                messages: newMessages
            }
        })

        const body  = {
            "messageIds": [ currentMessage.id ],
            "command": "star",
            "star": currentMessage.starred
        }

         await fetch(`${env.REACT_APP_API_URL}/api/messages`, {
            method: 'PATCH',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
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


    handleDeleteMessages = () => {
        this.setState((prevState) => {
            const newMessages = prevState.messages.map(message => {
                if (!message.selected) {
                    return message
                }
            })
            return {
                ...prevState,
                messages: newMessages.filter(message => message !== undefined)
            }
        })
    }

    handleAddLabel = (e) => {
        const selectedValue = e.target.value
        this.setState((prevState) => {
            const newMessages = prevState.messages.map(message => {
                if (message.selected && !message.labels.includes(selectedValue) && selectedValue !== 'Apply label') {
                    message.labels.push(selectedValue)
                }
                return message
            })
            return {
                ...prevState,
                messages: newMessages
            }
        })
    }

    handleRemoveLabel = (e) => {
        const selectedValue = e.target.value
        this.setState((prevState) => {
            const newMessages = prevState.messages.map(message => {
                if (message.selected) {
                    const labels = message.labels.filter(label => label !== selectedValue)
                    return {
                        ...message,
                        labels
                    }
                }
                return message
            })
            return {
                ...prevState,
                messages: newMessages
            }
        })
    }
}

export default App;
