import {
    MARK_READ, MARK_UNREAD, RECEIVE_MESSAGES, RECEIVE_STAR_MESSAGE, REQUEST_MARK_READ, REQUEST_STAR_MESSAGE,
    RECEIVE_MARK_READ, SELECT_ALL,
    TOGGLE_SELECT, REQUEST_MARK_UNREAD, RECEIVE_MARK_UNREAD, REQUEST_DELETE_MESSAGE, RECEIVE_DELETE_MESSAGE,
    REQUEST_ADD_LABEL, RECEIVE_ADD_LABEL, REQUEST_REMOVE_LABEL, RECEIVE_REMOVE_LABEL, REQUEST_POST_MESSAGE,
    RECEIVE_POST_MESSAGE, OPEN_COMPASS_FORM
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

export const toggleCheckbox = (e) => {
    return (dispatch) => {
        dispatch({type: TOGGLE_SELECT, id: e.target.id})
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

export const addLabel = (ids, label) => {
    return (dispatch) => {
        dispatch({type: REQUEST_ADD_LABEL})
        patchMessages({
            "messageIds": ids,
            "command": "addLabel",
            "label": label
        })
        dispatch({type: RECEIVE_ADD_LABEL, label})
    }
}

export const removeLabel = (ids, label) => {
    return (dispatch) => {
        dispatch({type: REQUEST_REMOVE_LABEL})
        patchMessages({
            "messageIds": ids,
            "command": "removeLabel",
            "label": label
        })
        dispatch({type: RECEIVE_REMOVE_LABEL, label})
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

export const postMessage = (subject, value) => {
    return async (dispatch) => {
        const env = process.env

        dispatch({type: REQUEST_POST_MESSAGE})

        const response = await fetch(`${env.REACT_APP_API_URL}/api/messages`, {
            method: 'POST',
            body: JSON.stringify({
                subject,
                value
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        const json = await response.json()
        dispatch({type: RECEIVE_POST_MESSAGE, message: json})
    }
}


export const renderForm = () => {
    return (dispatch) => {
        dispatch({type: OPEN_COMPASS_FORM})
    }
}

export default {
    toggleStar,
    toggleCheckbox,
    selectAll,
    markRead,
    markUnRead,
    deleteMessages,
    addLabel,
    removeLabel,
    postMessage,
    renderForm,
    fetchMessages
}