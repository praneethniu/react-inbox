import React from 'react'

class Toolbar extends React.Component {
    render() {
        const {
            handleSelectAll,
            selectAll,
            handleMarkAsRead,
            handleMarkAsUnRead,
            unreadCount,
            handleDeleteMessages,
            handleAddLabel,
            handleRemoveLabel,
            readOnly,
            renderForm
        } = this.props
        return (
            <div className="row toolbar">
                <div className="col-md-12">
                    <p className="pull-right">
                        <span className="badge badge">{unreadCount}</span>
                        {unreadCount === 1 ? 'unread message' : 'unread messages'}
                    </p>

                    <a className="btn btn-danger" onClick={renderForm}>
                        <i className="fa fa-plus" ></i>
                    </a>


                    <button className="btn btn-default" onClick={handleSelectAll}>
                        <i className={`fa ${selectAll === 'all' ? 'fa-check-square-o' :
                            (selectAll === 'some' ? 'fa-minus-square-o' : 'fa-square-o')}`}></i>
                    </button>

                    <button className="btn btn-default" onClick={handleMarkAsRead} disabled={readOnly}>
                        Mark As Read
                    </button>

                    <button className="btn btn-default" onClick={handleMarkAsUnRead} disabled={readOnly}>
                        Mark As Unread
                    </button>

                    <select className="form-control label-select" onChange={handleAddLabel} disabled={readOnly}>
                        <option>Apply label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <select className="form-control label-select" onChange={handleRemoveLabel} disabled={readOnly}>
                        <option>Remove label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <button className="btn btn-default" onClick={handleDeleteMessages} disabled={readOnly}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                </div>
            </div>
        )
    }
}

export default Toolbar