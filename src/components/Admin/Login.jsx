import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            email: '',
            password: '',
            errors: {},
            isLoading: false
        }
        
        this.handleLogin = this.handleLogin.bind(this);
        this.onChange = this.onChange.bind(this);
    }    
    
    handleLogin(e){
        e.preventDefault();
        const email = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        axios({
            method: "POST",
            url: "/api/login",
            data: {
                email: email,
                password: password
            },
            withCredentials: true,
        }).then(response =>{
            console.log(response.data);
            this.setState({data: ''});
            this.props.history.push('/profile');
        }).catch(error => {
            console.log(error.response.data.message)
        })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors, email, password, isLoading } = this.state;
        return(
            <Route render={({history}) => (
                <div className="login-wrapper">
                    <div className="login-container"></div>
                    <div className="form-container">
                        <form className="login-form" onSubmit={this.handleLogin}>
                            <button className="exit-login-button" type='button' onClick={() => { history.push('/') }}></button> 
                            <div class="pe-7s-door-lock pe-5x login-symbol"></div>                 
                            <h2>LOG IN</h2>
                            <span className="error-flash">{this.state.data.message}</span>
                            <input 
                                type="email" 
                                id="username" 
                                name="email" 
                                className="login-username" 
                                placeholder="Email"
                                value={email}
                                onChange={this.onChange}
                            />
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                className="login-password" 
                                placeholder="Password"
                                value={password}
                                onChange={this.onChange}
                            />
                            <div className="button-container">
                                <button type="submit" className="login-button" disabled={isLoading}>Login</button>
                            </div>
                        </form>
                    </div>
                </div>
             )} />
        ) 
    }
}

export default Login;