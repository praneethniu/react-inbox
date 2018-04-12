import {
    RECEIVE_MESSAGES, RECEIVE_STAR_MESSAGE, RECEIVE_MARK_READ, SELECT_ALL, TOGGLE_SELECT,
    RECEIVE_MARK_UNREAD, RECEIVE_DELETE_MESSAGE
} from "../actionTypes";

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
            let newMessages = state.messages.map(message => {
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

        case TOGGLE_SELECT:
            newMessages = state.messages.map(message => {
                if (message.id === Number(action.id)) {
                    return {
                        ...message,
                        selected: !message.selected
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

        case SELECT_ALL:
            if (action.status !== 'all') {
                return {
                    ...state,
                    messages: state.messages.map(message => {
                        return {
                            ...message,
                            selected: true
                        }
                    })
                }
            } else {
                return {
                    ...state,
                    messages: state.messages.map(message => {
                        return {
                            ...message,
                            selected: false
                        }
                    })

                }
            }

        case RECEIVE_MARK_READ:
            newMessages = state.messages.map(message => {
                if (message.selected) {
                    return {
                        ...message,
                        read: true,
                        selected: false
                    }
                } else {
                    return message
                }
            })
            return {
                ...state,
                messages: newMessages
            }

        case RECEIVE_MARK_UNREAD:
            newMessages = state.messages.map(message => {
                if (message.selected) {
                    return {
                        ...message,
                        read: false,
                        selected: false
                    }
                } else {
                    return message
                }
            })
            return {
                ...state,
                messages: newMessages
            }

        case RECEIVE_DELETE_MESSAGE:
            newMessages = state.messages.map(message => {
                if (!message.selected) {
                    return message
                }
            })
            return {
                ...state,
                messages: newMessages.filter(message => message !== undefined)
            }

        default:
            return state
    }
}