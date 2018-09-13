import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios';
import { connect } from 'react-redux';
import { login } from '../../store/login'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            email: '',
            password: ''
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    static defaultProps = {
        error: null,
        userObj: {},
        loginUser: () => null,
    }
    state = {
        error: null,
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            this.setState({ error: nextProps.error });
        }
    }

    handleLogin(e) {
        e.preventDefault();
        let { email, password } = this.state;
        this.props.login(email, password);
        this.props.history.push("/profile");
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { error, email, password, isLoading } = this.state;
        const errorMessage = error ? error.message : '';

        return (
            <Route render={({ history }) => (
                <div className="login-wrapper">
                    <div className="login-container"></div>
                    <div className="form-container">
                        <form className="login-form" onSubmit={this.handleLogin}>
                            <button className="exit-login-button" type='button' onClick={() => { history.push('/') }}></button>
                            <div class="pe-7s-door-lock pe-5x login-symbol"></div>
                            <h2>LOG IN</h2>
                            <span className="error-flash">{errorMessage}</span>
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

const mapStateToProps = state => {
    return {
        userObj: state.access.user,
        error: state.access.error,
    }
}

const mapDispatchToProps = dispatch => ({
    login: (email, password) => dispatch(login(email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);