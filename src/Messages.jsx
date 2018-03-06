import React from 'react'
import Message from "./Message";

class Messages extends React.Component {
    constructor(props) {
        super(props)

    }


    render() {
        const {messages, handleCheckbox, handleStar} = this.props

        return (
            <div>
                {messages.map(message =>
                    <Message
                        message={message}
                        handleCheckbox={handleCheckbox}
                        handleStar={handleStar}
                    />)}
            </div>
        )
    }
}

export default Messages