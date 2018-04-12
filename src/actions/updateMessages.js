import {RECEIVE_MESSAGES, RECEIVE_STAR_MESSAGE, REQUEST_STAR_MESSAGE} from "../actionTypes";


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
    fetchMessages
}