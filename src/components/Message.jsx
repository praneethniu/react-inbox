import React from 'react'

class Message extends React.Component {
    render() {
        const {message} = this.props

        const rowClass = (message.read ? 'read' : 'unread') + (message.selected ? ' selected' : '')
        const starClass = message.starred ? 'fa-star' : 'fa-star-o'

        return (
            <div className={`row message ${rowClass}`}>
                <div className="col-xs-1">
                    <div className="row">
                        <div className="col-xs-2">
                            <input type="checkbox" checked={message.selected} id={message.id} onClick={this.props.handleCheckbox}/>
                        </div>
                        <div className="col-xs-2">
                            <i className={`star fa ${starClass}`}  id={message.id}  id={message.id} onClick={this.props.handleStar}></i>
                        </div>
                    </div>
                </div>
                <div className="col-xs-11">
                    <a href="#">
                        {message.labels.map((label, id) => {
                            return <span key={id} className="label label-warning">{label}</span>
                        })}
                        {message.subject}
                    </a>
                </div>
            </div>)
    }
}

export default Message