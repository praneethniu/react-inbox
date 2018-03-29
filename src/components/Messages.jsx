import React from 'react'
import Message from "./Message";

class Messages extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        const {messages, handleCheckbox, handleStar} = this.props

        if (messages.length === 0) {
            return (<div>
                Inbox is empty
            </div>)
        }
        else {
            return (
                <div>
                    {messages.map((message, id) =>
                        <Message key={id}
                                 message={message}
                                 handleCheckbox={handleCheckbox}
                                 handleStar={handleStar}
                        />)}
                </div>
            )
        }
    }
}

export default Messages