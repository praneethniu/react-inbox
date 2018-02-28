import React from 'react'

class Message extends React.Component {
    constructor(props) {
        super(props);
        const {message} = this.props

        this.state = {
            rowClass: message.read ? 'read' : 'unread',
            starClass: 'fa-star-o'
        };

    }

    handleCheckbox = (e) => {
        console.log('row class', this.state.rowClass)
        if (e.target.value == 'on') {
            this.setState((prevState) => ({
                ...prevState,
                rowClass: this.state.rowClass === 'unread'? 'read selected' : 'unread'
            }));
        }
    }

    handleStar = () => {
        this.setState((prevState) => ({
            ...prevState,
            starClass: prevState.starClass === 'fa-star-o' ? 'fa-star' : 'fa-star-o'
        }));
    }

    render() {
        const {message} = this.props
        return (
            <div className={`row message ${this.state.rowClass}`}>
                <div className="col-xs-1">
                    <div className="row">
                        <div className="col-xs-2">
                            <input type="checkbox" onClick={this.handleCheckbox}/>
                        </div>
                        <div className="col-xs-2">
                            <i className={`star fa ${this.state.starClass}`} onClick={this.handleStar}></i>

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