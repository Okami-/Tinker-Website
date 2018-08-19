import React, { Component } from "react";
import ScrollableAnchor from 'react-scrollable-anchor';
import { configureAnchors } from 'react-scrollable-anchor';
configureAnchors({offset: -230, scrollDuration: 800});

class Header extends Component {
    
    handleClick(e) {
        document.querySelector('.nav-menu').addEventListener('click', e => {
            e.target.classList.toggle('visible');
        });
        console.log('hi')
    };
    
    

    render() {
        return (
            <header className="header">
                <div className="header-container">
                    <div className="logo"><h1>Tinker</h1></div>
                    <ul className="nav-menu" onClick={(e) => this.handleClick(e)}>
                        <li><a href="#section1">ABOUT</a></li>
                        <li><a href="#section2">SERVICES</a></li>
                        {/* <li><a href="#">WORK</a></li> */}
                        <li><a href="#section3">CONTACT</a></li>
                    </ul>
                </div>
            </header>
        )
    }
};


export default Header;