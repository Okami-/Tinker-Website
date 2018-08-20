import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import registerServiceWorker from './registerServiceWorker';
import style from "./assets/stylesheets/main.scss";
import './assets/vendor/pe-icon-7-stroke/dist/pe-icon-7-stroke.css';
import bigGear from './assets/images/bigGear.svg';

ReactDOM.render(<App />,document.getElementById("root"));
registerServiceWorker();

if (module.hot) {
    module.hot.accept();
}