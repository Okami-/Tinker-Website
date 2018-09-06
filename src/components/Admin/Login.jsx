import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {data: ''}
    }    
    
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
            // This is the response if the user does not match the user in db from the passport response
            if(res.data.message === 'No user found.'){
                this.setState({data: res.data.message});
            // This is the response if the password does not match the password in db from the passport response    
            } else if(res.data.message === 'Oops! Wrong password.'){
                this.setState({data: res.data.message});
            // If the user and pass match clear the state with an empty string 
            } else {
                this.setState({data: ''});
                this.props.history.push('/profile')
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