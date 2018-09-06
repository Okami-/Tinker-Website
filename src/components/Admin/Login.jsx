import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {data: ''}
    }    

    // componentWillUnmount() {
    //     this.state = {data: ''}
    // }
    
    handleLogin(e){
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        axios({
            method: "POST",
            url: "/api/login",
            data: {
                username: username,
                password: password
            }
        }).then((res)=>{
            if(res.data.message === 'No user found.'){
                this.setState({data: res.data.message});
            } else if(res.data.message === 'Oops! Wrong password.'){
                this.setState({data: res.data.message});
            } 
        })
    }

    render() {
        return(
            <Route render={({history}) => (
                <div className="login-wrapper">
                    <div className="login-container"></div>
                    <div className="form-container">
                        <form className="login-form" onSubmit={this.handleLogin.bind(this)} method="POST">
                            <button className="exit-login-button" type='button' onClick={() => { history.push('/') }}></button> 
                            <div class="pe-7s-door-lock pe-5x login-symbol"></div>                 
                            <h2>LOG IN</h2>
                            <span className="error-flash">{this.state.data}</span>
                            <input type="text" id="username" name="username" className="login-username" placeholder="Username" />
                            <input type="password" id="password" name="password" className="login-password" placeholder="Password" />
                            <div className="button-container">
                                <button type="submit" className="login-button">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
             )} />
        ) 
    }
}

export default Login;