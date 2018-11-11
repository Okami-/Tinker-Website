import React, { Component } from "react";
import { configureAnchors } from 'react-scrollable-anchor';
configureAnchors({ offset: -230, scrollDuration: 500 });
import { connect } from 'react-redux';
import { logout } from '../../store/login'
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import { HashLink as Link } from 'react-router-hash-link'

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

    handleLogout = () => {
        this.props.logoutUser();
    }


    render() {
        const { userObj } = this.props;
        let loggedEle = null;
        if (userObj.isAuthenticated) {
            loggedEle = [
                <li key="{loggedEleProfile}"><Link to="/profile">PROFILE</Link></li>,
                <li key="{loggedEleLogout}"><Link to="/" onClick={this.handleLogout}>LOGOUT</Link></li>,
            ]
        } else {
            loggedEle = (
                <li><Link to="/login">LOGIN</Link></li>
            )
        }
        return (
            <div>
                    <header className="header" >
                        <div className="header-container">
                            <div className="logo"><h1>Tinker</h1></div>
                            <button className="hamburger" onClick={this.toggleClass}></button>
                            <ul className={`${this.state.showMenu ? 'visible ' : ''}nav-menu`}>
                                <li><Link to="/#section1">HOME</Link></li>
                                <li><Link to="/#section2">SERVICES</Link></li>
                                {loggedEle}
                                <li><Link to='/posts'>BLOG</Link></li>
                                <li><Link to="/#section3">CONTACT</Link></li>

                            </ul>
                        </div>
                    </header>
            
            </div >
        )
    }
};

const mapStateToProps = state => ({
    userObj: state.access.user,
})

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);