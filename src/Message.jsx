import React from 'react'

class Message extends React.Component {
    constructor(props) {
        super(props);
        const {message, rowSelected} = this.props

        this.state = {
            rowStatus: message.read,
            rowSelected,
            starSelected: false
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState((prevState) => {
            return {
                ...prevState,
                rowSelected: nextProps.rowSelected
            }
        });
    }

    handleCheckbox = (e) => {
        if (e.target.value == 'on') {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    rowSelected: !prevState.rowSelected
                }
            });
        }
    }

    handleStar = () => {
        this.setState((prevState) => ({
            ...prevState,
            starSelected: !prevState.starSelected

        }));
    }

    render() {
        const {message} = this.props
        console.log('state ', this.state)
        const starClass = this.state.starSelected ? 'fa-star' : 'fa-star-o'
        let rowClass = (this.state.rowStatus ? 'read' : 'unread') + (this.state.rowSelected ? ' selected' : '')

        return (
            <div className={`row message ${rowClass}`}>
                <div className="col-xs-1">
                    <div className="row">
                        <div className="col-xs-2">
                            <input type="checkbox" checked={this.state.rowSelected} onClick={this.handleCheckbox}/>
                        </div>
                        <div className="col-xs-2">
                            <i className={`star fa ${starClass}`} onClick={this.handleStar}></i>

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