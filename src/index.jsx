import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import style from "./assets/stylesheets/main.scss";
import './assets/vendor/pe-icon-7-stroke/dist/pe-icon-7-stroke.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'


// Redux Store

import { Provider } from 'react-redux'
import { configureStore } from './store'

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);

registerServiceWorker();

if (module.hot) {
    module.hot.accept();
}