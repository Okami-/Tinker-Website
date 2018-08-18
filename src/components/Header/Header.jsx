import React, { Component } from "react";

class Header extends Component {
    render() {
        return (
            <header className="header">
                <div className="logo"><h1>Tinker</h1></div>
                <ul className="nav-menu">
                    <li><a href="#">ABOUT</a></li>
                    <li><a href="#">SERVICES</a></li>
                    <li><a href="#">WORK</a></li>
                    <li><a href="#">CONTACT</a></li>
                </ul>
            </header>
        )
    }
};


export default Header;