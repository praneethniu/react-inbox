import {RECEIVE_MESSAGES, RECEIVE_STAR_MESSAGE} from "../actionTypes";

const initialState = {
    messages: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_MESSAGES:
            return {
                messages: action.messages
            }
        case RECEIVE_STAR_MESSAGE:
            const newMessages = state.messages.map(message => {
                if (message.id === action.message.id) {
                    return {
                        ...message,
                        starred: !message.starred
                    }
                }
                else {
                    return message
                }
            })
            return {
                ...state,
                messages: newMessages
            }
        default:
            return state
    }
}