import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import style from "./assets/stylesheets/main.scss";
import './assets/vendor/pe-icon-7-stroke/dist/pe-icon-7-stroke.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'
import { login } from './store/Login'
// Redux Store

ReactDOM.render(
    
        <BrowserRouter>
            <App />
        </BrowserRouter>,
    document.getElementById("root")
);

registerServiceWorker();

if (module.hot) {
    module.hot.accept();
}