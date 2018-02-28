import React from 'react'
import Message from "./Message";

class Messages extends React.Component {
    render() {
        const {messages} = this.props

        return (
            <div>
                {messages.map(message => <Message message={message}/>)}
            </div>
        )
    }
}

export default Messages