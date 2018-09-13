import ReactGA from 'react-ga';
import React, { Component } from "react";
import Header from "./Header/Header.jsx";
import Banner from "./Banner/Banner.jsx";
import Services from "./Services/Services.jsx";
import Contact from "./Contact/Contact.jsx";
import ContactForm from "./Contact/ContactForm.jsx";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from "../components/Admin/Login.jsx";
import Profile from "../components/Profile/Profile.jsx";
class App extends Component {

	constructor() {
		super();
		// Google analytics initialization 
		ReactGA.initialize('UA-124346038-1');
		ReactGA.pageview(window.location.pathname);
	}

	render() {
		return (
			<div className="App">
				<Header />
				<Switch>
					<Route exact path='/' render={props =>
						<div>
							<Banner />
							<Services />
							<Contact />
							<ContactForm />
						</div>
					} />
					<Route path="/profile" component={Profile} />
					<Route path="/login" component={Login} />
				</Switch>
			</div>
		);
	}
}

export default App;
