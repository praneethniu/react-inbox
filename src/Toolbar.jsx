import React from 'react'

class Toolbar extends React.Component {
    render() {
        const {handleSelectAll, selectAll, handleMarkAsRead, handleMarkAsUnRead, unreadCount, handleDeleteMessages} = this.props
        return (
            <div className="row toolbar">
                <div className="col-md-12">
                    <p className="pull-right">
                        <span className="badge badge">{unreadCount}</span>
                        unread messages
                    </p>

                    <button className="btn btn-default" onClick={handleSelectAll}>
                        <i className={`fa ${selectAll ? 'fa-check-square-o' : 'fa-minus-square-o'}`}></i>
                    </button>

                    <button className="btn btn-default" onClick={handleMarkAsRead}>
                        Mark As Read
                    </button>

                    <button className="btn btn-default" onClick={handleMarkAsUnRead}>
                        Mark As Unread
                    </button>

                    <select className="form-control label-select">
                        <option>Apply label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <select className="form-control label-select">
                        <option>Remove label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <button className="btn btn-default" onClick={handleDeleteMessages}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                </div>
            </div>
        )
    }
}

export default Toolbar