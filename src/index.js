import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';

import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from "react-redux";
import store from "./store";

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
