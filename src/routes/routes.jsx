import React, { Component } from "react";
import Login from "../components/Admin/Login.jsx";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Profile from "../components/Profile/Profile.jsx";

class LoginRoutes extends Component {
    render() {
        return(   
            <Route path="/login" component={Login} />
        )
    }
}

export default LoginRoutes;