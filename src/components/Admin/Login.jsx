import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios';

class Login extends Component {    
    
    handleLogin(e){
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        axios({
            method: "POST",
            url: "http://localhost:8085/login",
            data: {
                username: username,
                password: password
            }
        }).then((response)=>{
            if(response.data.msg === 'success'){
                //  TODO: replace this with a class added to the form id that will update styles
                alert("Message Sent.");
                this.resetForm()
            } else if(response.data.msg === 'fail'){
                alert("Message failed to send.")
            }
        })
    }

    render() {
        return(
            <Route render={({ history}) => (
                <div className="login-wrapper">
                    <div className="login-container"></div>
                    <div className="form-container">
                        <form className="login-form"  method="POST" onSubmit={this.handleLogin.bind(this)}>
                            <button class="exit-login-button" type='button' onClick={() => { history.push('/') }}></button> 
                            <div class="pe-7s-door-lock pe-5x login-symbol"></div>                 
                            <h2>LOG IN</h2>
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