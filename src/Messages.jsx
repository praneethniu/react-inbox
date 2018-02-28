import React from 'react'
import Message from "./Message";

class Messages extends React.Component {
    render() {
        const {messages, selectAll} = this.props

        return (
            <div>
                {messages.map(message => <Message message={message} rowSelected={selectAll}/>)}
            </div>
        )
    }
}

export default Messages