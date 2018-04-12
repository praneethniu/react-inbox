import React, {Component} from 'react';
import logo from '../logo.svg';
import '../App.css';
import Toolbar from "./Toolbar";
import Messages from "./Messages";
import {ComposeForm} from "./ComposeForm";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    toggleStar, fetchMessages, toggleCheckbox, selectAll, markRead, markUnRead,
    deleteMessages
} from "../actions/updateMessages";


class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            messages: [],
            openComposeForm: false
        }
    }

    async componentDidMount() {
      const {fetchMessages} = this.props
        fetchMessages()
    }

    render() {
        const selection = this.fetchSelectAll()
        console.log('props', this.props)
        const {messages} = this.props
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
                    messages={messages}
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
        return this.props.messages
            .filter(message => message.selected).length === 0
    }

    fetchSelectAll = () => {
        const selectedMessages = this.props.messages
            .filter(message => message.selected)

        if (selectedMessages.length === 0) {
            return 'none'
        }
        else if (selectedMessages.length === this.props.messages.length) {
            return 'all'
        }
        else {
            return 'some'
        }
    }

    fetchMessage = (id) => {
        return this.props.messages.find(message => message.id === Number(id))
    }

    handleCheckbox = (e) => {
        this.props.toggleCheckbox(e.target.id)

    }

    handleStar = (e) => {
       this.props.toggleStar(this.fetchMessage( e.target.id))
    }

    handleSelectAll = () => {
        this.props.selectAll(this.fetchSelectAll())
    }

    fetchSelectedMessageIds = () => {
        return this.props.messages.filter(message => message.selected).map(message => message.id)
    }

    handleMarkAsRead = async () => {
        this.props.markRead(this.fetchSelectedMessageIds())
    }


    handleMarkAsUnRead = () => {
        this.props.markUnRead(this.fetchSelectedMessageIds())
    }

    unreadCount = () => {
        return this.props.messages.filter(message => message.read === false).length
    }

    handleDeleteMessages = () => {
        this.props.deleteMessages(this.fetchSelectedMessageIds())
    }

    handleAddLabel = (e) => {
        const selectedValue = e.target.value

        this.patchMessages({
            "messageIds": this.fetchSelectedMessageIds(),
            "command": "addLabel",
            "label": selectedValue
        })

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
        this.patchMessages({
            "messageIds": this.fetchSelectedMessageIds(),
            "command": "removeLabel",
            "label": selectedValue
        })
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
    }

    postMessage = async (subject, value) => {
        const env = process.env

        const response = await fetch(`${env.REACT_APP_API_URL}/api/messages`, {
            method: 'POST',
            body: JSON.stringify({
                subject,
                value
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        const json = await response.json()
        this.setState((prevState) => {
            const newMessages = [
                ...prevState.messages,
                json
            ]

            return {
                ...prevState,
                messages: newMessages
            }
        })
    }
}

const mapStateToProps = state => ({
    messages: state.messages,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleStar,
    toggleCheckbox,
    selectAll,
    markRead,
    markUnRead,
    deleteMessages,
    fetchMessages
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
