import React, { Component } from "react";
import ScrollableAnchor from 'react-scrollable-anchor';
import { configureAnchors } from 'react-scrollable-anchor';
configureAnchors({offset: -230, scrollDuration: 800});

class Header extends Component {
    
    // handleClick(e) {
    //     document.querySelector('.nav-menu').addEventListener('click', e => {
    //         e.target.classList.toggle('visible');
    //     });
    //     console.log('hi')
    // };
    // (e) => this.handleClick(e)
    
    constructor(props) {
        super(props);
        this.toggleClass = this.toggleClass.bind(this);
        this.state = { 
            showMenu: false 
        };       
    }

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