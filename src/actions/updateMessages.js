import {
    MARK_READ, MARK_UNREAD, RECEIVE_MESSAGES, RECEIVE_STAR_MESSAGE, REQUEST_MARK_READ, REQUEST_STAR_MESSAGE,
    RECEIVE_MARK_READ, SELECT_ALL,
    TOGGLE_SELECT, REQUEST_MARK_UNREAD, RECEIVE_MARK_UNREAD, REQUEST_DELETE_MESSAGE, RECEIVE_DELETE_MESSAGE
} from "../actionTypes";


export const toggleStar = (currentMessage) => {
    return (dispatch) => {
        dispatch({type: REQUEST_STAR_MESSAGE})
        patchMessages({
            "messageIds": [currentMessage.id],
            "command": "star",
            "star": !currentMessage.starred
        })
        dispatch({type: RECEIVE_STAR_MESSAGE, message: currentMessage})

    }
}

export const toggleCheckbox = (id) => {
    return (dispatch) => {
        dispatch({type: TOGGLE_SELECT, id: id})
    }
}

export const selectAll = (status) => {
    return (dispatch) => {
        dispatch({type: SELECT_ALL, status})
    }
}

export const markRead = (ids) => {
    return (dispatch) => {
        dispatch({type: REQUEST_MARK_READ})
        patchMessages({
            "messageIds": ids,
            "command": "read",
            "read": true
        })
        dispatch({type: RECEIVE_MARK_READ})
    }
}

export const markUnRead = (ids) => {
    return (dispatch) => {
        dispatch({type: REQUEST_MARK_UNREAD})
        patchMessages({
            "messageIds": ids,
            "command": "read",
            "read": false
        })
        dispatch({type: RECEIVE_MARK_UNREAD})
    }
}

export const deleteMessages = (ids) => {
    return (dispatch) => {
        dispatch({type: REQUEST_DELETE_MESSAGE})
        patchMessages({
            "messageIds": ids,
            "command": "delete"
        })
        dispatch({type: RECEIVE_DELETE_MESSAGE})
    }
}

const patchMessages = async (payload) => {
    const env = process.env

    await fetch(`${env.REACT_APP_API_URL}/api/messages`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    });
}


export const fetchMessages = () => {
    return async (dispatch) => {
        const env = process.env
        const response = await fetch(`${env.REACT_APP_API_URL}/api/messages`)
        const json =  await response.json()
        dispatch({type: RECEIVE_MESSAGES, messages: json._embedded.messages})
    }
}


export default {
    toggleStar,
    toggleCheckbox,
    selectAll,
    markRead,
    markUnRead,
    deleteMessages,
    fetchMessages
}