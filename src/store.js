import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {logger} from "redux-logger";
import rootReducer from "./reducers/rootReducer";

const middleware = [
    logger,
    thunk,
]

const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
)

export default store