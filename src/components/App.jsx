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
    deleteMessages, addLabel, removeLabel, postMessage, openCompassForm, renderForm
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
                    renderForm={this.props.renderForm}

                />
                <ComposeForm
                    openComposeForm={this.props.openComposeForm}
                    postMessage={this.props.postMessage}
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
        this.props.addLabel(this.fetchSelectedMessageIds(), e.target.value)
    }

    handleRemoveLabel = (e) => {
        this.props.removeLabel(this.fetchSelectedMessageIds(), e.target.value)
    }
}

const mapStateToProps = state => ({
    messages: state.messages,
    openComposeForm: state.openComposeForm
})

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleStar,
    toggleCheckbox,
    selectAll,
    markRead,
    markUnRead,
    deleteMessages,
    addLabel,
    removeLabel,
    postMessage,
    renderForm,
    fetchMessages
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
