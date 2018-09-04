import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import style from "./assets/stylesheets/main.scss";
import './assets/vendor/pe-icon-7-stroke/dist/pe-icon-7-stroke.css';
import bigGear from './assets/images/bigGear.svg';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'

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