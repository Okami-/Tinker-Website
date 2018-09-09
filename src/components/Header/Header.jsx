import React, { Component } from "react";
import { configureAnchors } from 'react-scrollable-anchor';
configureAnchors({offset: -230, scrollDuration: 500});

import {
	BrowserRouter as Router,
    Link,
    Route,
  } from 'react-router-dom'

class Header extends Component {

    // Mobile Menu Logic
    constructor(props) {
        super(props);
        this.toggleClass = this.toggleClass.bind(this);
        this.state = { 
            showMenu: false,
            isLoggedIn: false 
        };       
    }

    // Mobile Menu Logic
    toggleClass(event) {
        const currentState = this.state.showMenu;
        this.setState({
            showMenu: !currentState
        })
    }
    
    render() {
        return (
            <header className="header">
                <div className="header-container">
                    <div className="logo"><h1>Tinker</h1></div>
                    <button className="hamburger" onClick={this.toggleClass}></button>
                    <ul className={`${this.state.showMenu ? 'visible ' : ''}nav-menu`}>              
                        <li><a href="/#section1">ABOUT</a></li>
                        <li><a href="/#section2">SERVICES</a></li>   
                        <li>
                            <Link to="/login">{
                                this.props.isLogggedIn ? 'LOGOUT' : 'LOGIN'
                            }</Link>
                        </li>
                        <li><a href="/#section3">CONTACT</a></li>
                       
                    </ul>
                </div>
            </header>
        )
    }
};

export default Header;